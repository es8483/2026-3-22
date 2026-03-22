# Professor Toolkit

A command-line tool for managing course rosters and grades.

## Features

- Add and manage students
- Record assignment, midterm, and final exam grades
- Compute weighted final scores automatically
- Generate CSV grade reports
- View class summary statistics
- Import students from CSV

## Setup

```bash
pip install -r requirements.txt
```

## Usage

```bash
python main.py <command> [options]
```

### Commands

| Command | Description |
|---------|-------------|
| `add-student <id> <name> [--email]` | Add a student to the roster |
| `list-students` | List all students with current grades |
| `add-grade <id> <type> <score>` | Record a grade (type: assignment, midterm, final) |
| `report` | Export grades to `output/grade_report.csv` |
| `summary` | Print class statistics and grade distribution |
| `import-csv <file>` | Bulk-import students from a CSV file |

### Examples

```bash
# Add students
python main.py add-student S001 "Alice Kim" --email alice@example.com
python main.py add-student S002 "Bob Lee"

# Record grades
python main.py add-grade S001 assignment 88
python main.py add-grade S001 assignment 92
python main.py add-grade S001 midterm 85
python main.py add-grade S001 final 90

# View roster
python main.py list-students

# Class overview
python main.py summary

# Export to CSV
python main.py report
```

### Importing Students via CSV

Create a CSV file with columns `id`, `name`, and optionally `email`:

```csv
id,name,email
S001,Alice Kim,alice@example.com
S002,Bob Lee,bob@example.com
```

Then run:

```bash
python main.py import-csv students.csv
```

## Configuration

Edit `config.json` to customize course info and grading weights:

```json
{
  "course": {
    "name": "Introduction to Computer Science",
    "code": "CS101",
    "semester": "Spring 2026",
    "instructor": "Prof. Smith"
  },
  "grading": {
    "scale": { "A": 90, "B": 80, "C": 70, "D": 60, "F": 0 },
    "weights": {
      "assignments": 0.30,
      "midterm": 0.30,
      "final": 0.40
    }
  }
}
```

## Building a Windows Executable

On Windows, run:

```bat
build_exe.bat
```

This produces `dist/professor_toolkit.exe` — a self-contained executable requiring no Python installation.

## Data Storage

Student and grade data is stored locally in `data/students.json`. Grade reports are written to the `output/` directory.
