import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AttachmentQuiz from './components/AttachmentQuiz';
import ResultsPage from './components/ResultsPage';
import CounselingPage from './components/CounselingPage';
import ExercisesPage from './components/ExercisesPage';
import ApiKeyModal from './components/ApiKeyModal';

const STEPS = {
  LANDING: 'landing',
  QUIZ: 'quiz',
  RESULTS: 'results',
  COUNSELING: 'counseling',
  EXERCISES: 'exercises',
};

const API_KEY_STORAGE = 'attachment_app_api_key';

export default function App() {
  const [step, setStep] = useState(STEPS.LANDING);
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem(API_KEY_STORAGE) || '');
  const [showApiModal, setShowApiModal] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const handleApiKeySet = (key) => {
    setApiKey(key);
    sessionStorage.setItem(API_KEY_STORAGE, key);
    setShowApiModal(false);
    setStep(STEPS.QUIZ);
  };

  const handleStart = () => {
    if (!apiKey) {
      setShowApiModal(true);
    } else {
      setStep(STEPS.QUIZ);
    }
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setStep(STEPS.RESULTS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setQuizResult(null);
    setStep(STEPS.QUIZ);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeApiKey = () => {
    setShowApiModal(true);
  };

  return (
    <div className="min-h-screen">
      {/* API Key Modal */}
      {showApiModal && (
        <ApiKeyModal onApiKeySet={handleApiKeySet} />
      )}

      {/* Navigation Bar (shown when not on landing) */}
      {step !== STEPS.LANDING && (
        <div className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between">
            <button
              onClick={() => setStep(STEPS.LANDING)}
              className="flex items-center gap-2 text-primary-600 font-bold text-sm hover:text-primary-700 transition-colors"
            >
              <span>💜</span>
              <span>마음의 연결</span>
            </button>

            {/* Step indicator */}
            <div className="flex items-center gap-1">
              {[STEPS.QUIZ, STEPS.RESULTS, STEPS.COUNSELING, STEPS.EXERCISES].map((s, i) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full transition-all ${
                    step === s ? 'bg-primary-500 w-4' :
                    [STEPS.QUIZ, STEPS.RESULTS, STEPS.COUNSELING, STEPS.EXERCISES].indexOf(step) > i
                      ? 'bg-primary-300' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleChangeApiKey}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
              title="API 키 변경"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              키 변경
            </button>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className={step !== STEPS.LANDING ? 'pt-10' : ''}>
        {step === STEPS.LANDING && (
          <LandingPage onStart={handleStart} />
        )}

        {step === STEPS.QUIZ && (
          <AttachmentQuiz onComplete={handleQuizComplete} />
        )}

        {step === STEPS.RESULTS && quizResult && (
          <ResultsPage
            result={quizResult}
            apiKey={apiKey}
            onGoToCounseling={() => setStep(STEPS.COUNSELING)}
            onRetake={handleRetake}
          />
        )}

        {step === STEPS.COUNSELING && quizResult && (
          <CounselingPage
            result={quizResult}
            apiKey={apiKey}
            onGoToExercises={() => setStep(STEPS.EXERCISES)}
            onBack={() => setStep(STEPS.RESULTS)}
          />
        )}

        {step === STEPS.EXERCISES && quizResult && (
          <ExercisesPage
            result={quizResult}
            onBack={() => setStep(STEPS.RESULTS)}
            onGoToCounseling={() => setStep(STEPS.COUNSELING)}
          />
        )}
      </div>
    </div>
  );
}
