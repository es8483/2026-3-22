"""
Professor Toolkit - A command-line tool for managing course grades and students.

Usage:
    python main.py [command] [options]

Commands:
    add-student     Add a student to the roster
    list-students   List all students
    add-grade       Record a grade for a student
    report          Generate grade report
    summary         Show class summary statistics
    import-csv      Import students from a CSV file
    export-csv      Export grade report to CSV
"""

import argparse
import csv
import json
import os
import sys
from pathlib import Path

try:
    from tabulate import tabulate
    HAS_TABULATE = True
except ImportError:
    HAS_TABULATE = False


CONFIG_PATH = Path(__file__).parent / "config.json"
DATA_DIR = Path(__file__).parent / "data"
STUDENTS_FILE = DATA_DIR / "students.json"


def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)


def load_students():
    if not STUDENTS_FILE.exists():
        return {}
    with open(STUDENTS_FILE) as f:
        return json.load(f)


def save_students(students):
    DATA_DIR.mkdir(exist_ok=True)
    with open(STUDENTS_FILE, "w") as f:
        json.dump(students, f, indent=2)


def letter_grade(score, scale):
    for letter in ["A", "B", "C", "D"]:
        if score >= scale[letter]:
            return letter
    return "F"


def compute_final_grade(student, weights):
    assignments = student.get("grades", {}).get("assignments", [])
    midterm = student.get("grades", {}).get("midterm")
    final = student.get("grades", {}).get("final")

    assignment_avg = sum(assignments) / len(assignments) if assignments else None

    components = []
    if assignment_avg is not None:
        components.append(assignment_avg * weights["assignments"])
    if midterm is not None:
        components.append(midterm * weights["midterm"])
    if final is not None:
        components.append(final * weights["final"])

    if not components:
        return None

    # Normalize by weights actually present
    present_weight = 0.0
    if assignment_avg is not None:
        present_weight += weights["assignments"]
    if midterm is not None:
        present_weight += weights["midterm"]
    if final is not None:
        present_weight += weights["final"]

    return sum(components) / present_weight if present_weight > 0 else None


def cmd_add_student(args, config, students):
    sid = args.id.strip()
    if sid in students:
        print(f"Student '{sid}' already exists.")
        return
    students[sid] = {
        "name": args.name,
        "id": sid,
        "email": args.email or "",
        "grades": {"assignments": [], "midterm": None, "final": None},
    }
    save_students(students)
    print(f"Added student: {args.name} ({sid})")


def cmd_list_students(args, config, students):
    if not students:
        print("No students enrolled.")
        return

    weights = config["grading"]["weights"]
    scale = config["grading"]["scale"]

    rows = []
    for sid, s in students.items():
        score = compute_final_grade(s, weights)
        grade = letter_grade(score, scale) if score is not None else "N/A"
        score_str = f"{score:.1f}" if score is not None else "N/A"
        rows.append([sid, s["name"], s.get("email", ""), score_str, grade])

    headers = ["ID", "Name", "Email", "Score", "Grade"]
    if HAS_TABULATE:
        print(tabulate(rows, headers=headers, tablefmt="grid"))
    else:
        print("\t".join(headers))
        for row in rows:
            print("\t".join(str(c) for c in row))


def cmd_add_grade(args, config, students):
    sid = args.id.strip()
    if sid not in students:
        print(f"Student '{sid}' not found. Use add-student first.")
        return

    grade_type = args.type.lower()
    score = float(args.score)

    if not (0 <= score <= 100):
        print("Score must be between 0 and 100.")
        return

    if grade_type == "assignment":
        students[sid]["grades"]["assignments"].append(score)
        n = len(students[sid]["grades"]["assignments"])
        print(f"Added assignment grade {score} for {students[sid]['name']} (assignment #{n})")
    elif grade_type == "midterm":
        students[sid]["grades"]["midterm"] = score
        print(f"Set midterm grade {score} for {students[sid]['name']}")
    elif grade_type == "final":
        students[sid]["grades"]["final"] = score
        print(f"Set final grade {score} for {students[sid]['name']}")
    else:
        print("Grade type must be: assignment, midterm, or final")
        return

    save_students(students)


def cmd_report(args, config, students):
    if not students:
        print("No students enrolled.")
        return

    weights = config["grading"]["weights"]
    scale = config["grading"]["scale"]
    course = config["course"]

    output_dir = Path(__file__).parent / config.get("output_dir", "output")
    output_dir.mkdir(exist_ok=True)
    report_path = output_dir / "grade_report.csv"

    with open(report_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Course", course["name"], course["code"], course["semester"]])
        writer.writerow([])
        writer.writerow(["ID", "Name", "Email", "Assignments Avg", "Midterm", "Final", "Weighted Score", "Letter Grade"])
        for sid, s in students.items():
            assignments = s["grades"].get("assignments", [])
            a_avg = sum(assignments) / len(assignments) if assignments else ""
            midterm = s["grades"].get("midterm", "")
            final = s["grades"].get("final", "")
            score = compute_final_grade(s, weights)
            grade = letter_grade(score, scale) if score is not None else ""
            writer.writerow([
                sid, s["name"], s.get("email", ""),
                f"{a_avg:.1f}" if a_avg != "" else "",
                midterm if midterm != "" else "",
                final if final != "" else "",
                f"{score:.1f}" if score is not None else "",
                grade,
            ])

    print(f"Report saved to: {report_path}")


def cmd_summary(args, config, students):
    if not students:
        print("No students enrolled.")
        return

    weights = config["grading"]["weights"]
    scale = config["grading"]["scale"]
    course = config["course"]

    scores = []
    grade_counts = {"A": 0, "B": 0, "C": 0, "D": 0, "F": 0}
    for s in students.values():
        score = compute_final_grade(s, weights)
        if score is not None:
            scores.append(score)
            grade_counts[letter_grade(score, scale)] += 1

    print(f"\n{'='*40}")
    print(f"  {course['name']} ({course['code']})")
    print(f"  {course['semester']} | {course['instructor']}")
    print(f"{'='*40}")
    print(f"  Total enrolled : {len(students)}")
    print(f"  Graded         : {len(scores)}")

    if scores:
        print(f"  Average score  : {sum(scores)/len(scores):.1f}")
        print(f"  Highest score  : {max(scores):.1f}")
        print(f"  Lowest score   : {min(scores):.1f}")
        print(f"\n  Grade Distribution:")
        for letter, count in grade_counts.items():
            bar = "#" * count
            print(f"    {letter}: {bar} ({count})")
    print(f"{'='*40}\n")


def cmd_import_csv(args, config, students):
    path = Path(args.file)
    if not path.exists():
        print(f"File not found: {path}")
        return

    added = 0
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            sid = row.get("id", "").strip()
            name = row.get("name", "").strip()
            if not sid or not name:
                continue
            if sid not in students:
                students[sid] = {
                    "name": name,
                    "id": sid,
                    "email": row.get("email", "").strip(),
                    "grades": {"assignments": [], "midterm": None, "final": None},
                }
                added += 1

    save_students(students)
    print(f"Imported {added} new student(s) from {path}")


def build_parser():
    parser = argparse.ArgumentParser(
        description="Professor Toolkit - Course grade management",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    sub = parser.add_subparsers(dest="command")

    # add-student
    p = sub.add_parser("add-student", help="Add a student to the roster")
    p.add_argument("id", help="Student ID")
    p.add_argument("name", help="Student full name")
    p.add_argument("--email", help="Student email address")

    # list-students
    sub.add_parser("list-students", help="List all students with current grades")

    # add-grade
    p = sub.add_parser("add-grade", help="Record a grade for a student")
    p.add_argument("id", help="Student ID")
    p.add_argument("type", choices=["assignment", "midterm", "final"], help="Grade type")
    p.add_argument("score", help="Numeric score (0-100)")

    # report
    sub.add_parser("report", help="Export grade report to CSV")

    # summary
    sub.add_parser("summary", help="Show class statistics")

    # import-csv
    p = sub.add_parser("import-csv", help="Import students from a CSV file (columns: id, name, email)")
    p.add_argument("file", help="Path to CSV file")

    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(0)

    config = load_config()
    students = load_students()

    commands = {
        "add-student": cmd_add_student,
        "list-students": cmd_list_students,
        "add-grade": cmd_add_grade,
        "report": cmd_report,
        "summary": cmd_summary,
        "import-csv": cmd_import_csv,
    }

    commands[args.command](args, config, students)


if __name__ == "__main__":
    main()
