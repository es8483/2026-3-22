export default function LandingPage({ onStart }) {
  const cards = [
    { emoji: '🧠', title: '심리과학 기반', desc: '존 볼비의 애착이론과 ECR-R 척도를 바탕으로 한 신뢰할 수 있는 분석' },
    { emoji: '🎨', title: 'AI 시각화', desc: 'Gemini AI가 당신의 애착 패턴을 아름다운 이미지로 표현합니다' },
    { emoji: '💬', title: '맞춤 상담', desc: '당신의 애착 유형에 최적화된 개인화된 연애 상담과 조언' },
    { emoji: '🌱', title: '성장 로드맵', desc: '더 건강한 관계를 위한 단계별 실습과 자기성장 가이드' },
  ];

  const attachmentTypes = [
    { name: '안정형', emoji: '🌿', color: 'bg-emerald-100 text-emerald-700', percent: '55%' },
    { name: '불안형', emoji: '🌊', color: 'bg-blue-100 text-blue-700', percent: '20%' },
    { name: '회피형', emoji: '🏔️', color: 'bg-amber-100 text-amber-700', percent: '25%' },
    { name: '혼란형', emoji: '🌀', color: 'bg-purple-100 text-purple-700', percent: '5-10%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-calm-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-calm-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>💜</span>
            <span>심리치료사가 설계한 애착이론 기반 프로그램</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            마음의
            <span className="bg-gradient-to-r from-primary-500 to-calm-500 bg-clip-text text-transparent"> 연결</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            당신의 <strong className="text-primary-600">애착 유형</strong>을 발견하고,
            더 건강하고 깊은 사랑을 만들어가세요
          </p>
          <p className="text-gray-500 text-base mb-10 max-w-xl mx-auto">
            존 볼비의 애착이론을 기반으로 한 20문항 검사로 나의 관계 패턴을 이해하고,
            AI와 함께하는 맞춤 상담을 경험해보세요.
          </p>

          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold px-10 py-4 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <span>무료로 시작하기</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="text-xs text-gray-400 mt-3">약 5분 소요 · 무료 · 개인정보 저장 없음</p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          어떻게 도움이 될까요?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="text-3xl mb-3">{card.emoji}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attachment Types Preview */}
      <div className="max-w-4xl mx-auto px-4 py-12 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          4가지 애착 유형
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Ainsworth & Main의 연구를 기반으로 한 4가지 주요 애착 유형
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {attachmentTypes.map((type, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="text-3xl mb-2">{type.emoji}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${type.color}`}>
                {type.name}
              </div>
              <p className="text-xs text-gray-400">성인의 약 {type.percent}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary-500 to-calm-500 rounded-3xl p-8 text-white text-center">
          <p className="text-lg font-medium mb-2">준비되셨나요?</p>
          <p className="text-primary-100 text-sm mb-6">
            당신의 애착 유형을 알아보고, AI와 함께하는 개인화된 상담을 경험해보세요
          </p>
          <button
            onClick={onStart}
            className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-md"
          >
            검사 시작하기 →
          </button>
        </div>
      </div>
    </div>
  );
}
