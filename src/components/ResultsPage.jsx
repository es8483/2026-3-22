import { useState, useEffect } from 'react';
import { ATTACHMENT_TYPES } from '../data/attachmentTypes';
import { generateImage } from '../utils/geminiApi';

export default function ResultsPage({ result, apiKey, onGoToCounseling, onRetake }) {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const typeData = ATTACHMENT_TYPES[result.type];

  useEffect(() => {
    generateAttachmentImage();
  }, []);

  const generateAttachmentImage = async () => {
    setImageLoading(true);
    setImageError('');
    try {
      const img = await generateImage(apiKey, typeData.imagePrompt);
      setGeneratedImage(img);
    } catch (err) {
      setImageError(err.message || '이미지 생성 중 오류가 발생했습니다.');
    } finally {
      setImageLoading(false);
    }
  };

  const scoreData = [
    { label: '안정감', value: result.averages.security, color: 'bg-emerald-500', max: 7 },
    { label: '불안', value: result.averages.anxiety, color: 'bg-blue-500', max: 7 },
    { label: '회피', value: result.averages.avoidance, color: 'bg-amber-500', max: 7 },
    { label: '혼란', value: result.averages.disorganized, color: 'bg-purple-500', max: 7 },
  ];

  const tabs = [
    { id: 'overview', label: '개요' },
    { id: 'strengths', label: '강점과 과제' },
    { id: 'tips', label: '상담 조언' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-calm-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Result Header */}
        <div className={`rounded-3xl p-8 mb-6 text-center bg-gradient-to-br ${typeData.color} text-white shadow-xl`}>
          <div className="text-5xl mb-3">{typeData.emoji}</div>
          <div className="text-sm font-medium opacity-80 mb-1">{typeData.englishName}</div>
          <h1 className="text-3xl font-bold mb-3">당신은 {typeData.name}입니다</h1>
          <p className="text-white/90 leading-relaxed text-sm max-w-xs mx-auto">
            {typeData.description}
          </p>
        </div>

        {/* AI Generated Image */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎨</span> AI가 표현한 나의 애착 패턴
          </h2>
          {imageLoading && (
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-50 to-calm-50 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-primary-500 font-medium">Gemini AI가 이미지를 생성하고 있습니다...</p>
              <p className="text-xs text-gray-400">약 10-30초 소요될 수 있습니다</p>
            </div>
          )}
          {!imageLoading && generatedImage && (
            <div className="space-y-3">
              <img
                src={generatedImage}
                alt={`${typeData.name} 애착 유형 시각화`}
                className="w-full rounded-2xl shadow-md"
              />
              <button
                onClick={generateAttachmentImage}
                className="w-full py-2 text-sm text-primary-500 border border-primary-200 rounded-xl hover:bg-primary-50 transition-colors"
              >
                🔄 다시 생성하기
              </button>
            </div>
          )}
          {!imageLoading && imageError && (
            <div className="aspect-video rounded-2xl bg-red-50 border border-red-200 flex flex-col items-center justify-center gap-3 p-6">
              <p className="text-sm text-red-500 text-center">{imageError}</p>
              <button
                onClick={generateAttachmentImage}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                다시 시도
              </button>
            </div>
          )}
        </div>

        {/* Score Chart */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📊</span> 애착 차원 점수
          </h2>
          <div className="space-y-4">
            {scoreData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.value.toFixed(1)} / 7.0</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affirmation */}
        <div className={`${typeData.bgColor} border ${typeData.borderColor} rounded-2xl p-5 mb-6`}>
          <p className="text-sm font-medium text-gray-500 mb-2">💫 오늘의 긍정 확언</p>
          <p className={`font-semibold ${typeData.textColor} text-lg leading-relaxed`}>
            "{typeData.affirmation}"
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  {typeData.longDescription}
                </p>
                <div className={`${typeData.bgColor} rounded-xl p-4`}>
                  <p className="text-xs font-medium text-gray-500 mb-2">관계 패턴</p>
                  <p className={`text-sm ${typeData.textColor} leading-relaxed`}>
                    {typeData.relationshipPattern}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'strengths' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-emerald-700 mb-3 flex items-center gap-1">
                    <span>✨</span> 강점
                  </h3>
                  <ul className="space-y-2">
                    {typeData.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-semibold text-amber-700 mb-3 flex items-center gap-1">
                    <span>🌱</span> 성장 과제
                  </h3>
                  <ul className="space-y-2">
                    {typeData.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <ul className="space-y-3">
                {typeData.counselingTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                    <span className="bg-primary-100 text-primary-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={onGoToCounseling}
            className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            💬 AI 상담사와 대화하기
          </button>
          <button
            onClick={onRetake}
            className="w-full py-3 border-2 border-gray-200 text-gray-600 font-medium rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            검사 다시하기
          </button>
        </div>
      </div>
    </div>
  );
}
