import { useState, useRef, useEffect } from 'react';
import { ATTACHMENT_TYPES } from '../data/attachmentTypes';
import { generateCounselingResponse } from '../utils/geminiApi';

const QUICK_QUESTIONS = [
  '내 애착 유형이 연애에 어떤 영향을 미치나요?',
  '파트너와 갈등이 생겼을 때 어떻게 해야 하나요?',
  '건강한 관계를 위해 무엇을 바꿔야 할까요?',
  '불안할 때 어떻게 자신을 달래야 하나요?',
  '파트너에게 내 애착 유형을 어떻게 설명하나요?',
];

export default function CounselingPage({ result, apiKey, onGoToExercises, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuickQ, setShowQuickQ] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const typeData = ATTACHMENT_TYPES[result.type];

  useEffect(() => {
    // Welcome message
    setMessages([{
      role: 'model',
      content: `안녕하세요! 저는 애착이론 기반 연애상담 AI입니다. 💜\n\n검사 결과, 당신은 **${typeData.name}(${typeData.englishName})**으로 나타났습니다.\n\n${typeData.description}\n\n오늘 어떤 부분에 대해 이야기 나눠보고 싶으신가요? 연애, 관계, 또는 자신에 대해 궁금한 것이 있다면 무엇이든 질문해주세요.`,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText) => {
    const text = messageText || input.trim();
    if (!text || loading) return;

    setInput('');
    setShowQuickQ(false);
    setLoading(true);

    const userMsg = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);

    try {
      const history = messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        content: m.content
      }));

      const response = await generateCounselingResponse(apiKey, result.type, text, history);
      setMessages(prev => [...prev, {
        role: 'model',
        content: response,
        timestamp: new Date()
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'error',
        content: `오류가 발생했습니다: ${err.message}`,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${typeData.color} flex items-center justify-center text-lg shadow-sm`}>
              {typeData.emoji}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">마음의 연결 상담사</p>
              <p className={`text-xs ${typeData.textColor}`}>{typeData.name} 맞춤 상담</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">온라인</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} typeData={typeData} formatMessage={formatMessage} />
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${typeData.color} flex items-center justify-center text-sm shrink-0 shadow-sm`}>
              {typeData.emoji}
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Quick Questions */}
        {showQuickQ && messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400 text-center">자주 묻는 질문</p>
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요... (Enter로 전송)"
                rows={1}
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-400 focus:outline-none resize-none text-sm disabled:opacity-60 transition-colors"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-md shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-400">Shift+Enter로 줄바꿈</p>
            <button
              onClick={onGoToExercises}
              className="text-xs text-primary-500 hover:text-primary-700 font-medium transition-colors"
            >
              실습 활동 보기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, typeData, formatMessage }) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2 text-xs">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${typeData.color} flex items-center justify-center text-sm shrink-0 shadow-sm mt-0.5`}>
        {typeData.emoji}
      </div>
      <div className="max-w-xs md:max-w-md bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
        <p
          className="text-sm leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
        />
        <p className="text-xs text-gray-300 mt-1">
          {message.timestamp?.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
