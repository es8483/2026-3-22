import { useState } from 'react';
import { QUESTIONS, SCALE_LABELS, calculateScores } from '../data/questions';

export default function AttachmentQuiz({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

  const pageQuestions = QUESTIONS.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const answeredOnPage = pageQuestions.filter(q => answers[q.id] !== undefined).length;
  const allOnPageAnswered = answeredOnPage === pageQuestions.length;
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / QUESTIONS.length) * 100;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const result = calculateScores(answers);
      onComplete(result, answers);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-calm-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">애착 유형 검사</h1>
          <p className="text-gray-500 text-sm">각 문항에 솔직하게 답해주세요</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">진행률</span>
            <span className="text-sm font-medium text-primary-600">
              {totalAnswered} / {QUESTIONS.length}문항
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className={`text-xs font-medium ${i === currentPage ? 'text-primary-600' : i < currentPage ? 'text-emerald-500' : 'text-gray-300'}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Scale Guide */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-3 text-center">응답 척도 안내</p>
          <div className="flex justify-between gap-1">
            {SCALE_LABELS.map((label) => (
              <div key={label.value} className="flex-1 text-center">
                <div className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1
                  ${label.value <= 2 ? 'bg-blue-100 text-blue-600' :
                    label.value === 4 ? 'bg-gray-100 text-gray-600' :
                    label.value >= 6 ? 'bg-primary-100 text-primary-600' :
                    'bg-gray-50 text-gray-500'}`}>
                  {label.value}
                </div>
                <p className="text-gray-400 leading-tight whitespace-pre-line" style={{ fontSize: '9px' }}>
                  {label.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4 mb-8">
          {pageQuestions.map((question, idx) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={currentPage * QUESTIONS_PER_PAGE + idx + 1}
              answer={answers[question.id]}
              onAnswer={(value) => handleAnswer(question.id, value)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentPage > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              ← 이전
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!allOnPageAnswered}
            className="flex-2 flex-grow py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {currentPage < totalPages - 1
              ? `다음 (${answeredOnPage}/${pageQuestions.length} 완료)`
              : '결과 보기 →'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          현재 페이지의 모든 문항에 답해야 다음으로 넘어갈 수 있습니다
        </p>
      </div>
    </div>
  );
}

function QuestionCard({ question, questionNumber, answer, onAnswer }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
      answer !== undefined ? 'border-primary-200 shadow-primary-50' : 'border-gray-100'
    }`}>
      <div className="flex items-start gap-3 mb-4">
        <span className="bg-primary-100 text-primary-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          {questionNumber}
        </span>
        <p className="text-gray-800 font-medium leading-relaxed">{question.text}</p>
      </div>

      <div className="flex gap-1.5 justify-between">
        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
          <button
            key={value}
            onClick={() => onAnswer(value)}
            className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all ${
              answer === value
                ? 'bg-primary-500 text-white shadow-md scale-105'
                : value <= 2
                ? 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                : value === 4
                ? 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                : 'bg-primary-50 text-primary-500 hover:bg-primary-100'
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      {answer !== undefined && (
        <div className="mt-2 text-right">
          <span className="text-xs text-primary-500 font-medium">
            ✓ {SCALE_LABELS[answer - 1].label.replace('\n', ' ')}
          </span>
        </div>
      )}
    </div>
  );
}
