import { useState } from 'react';
import { ATTACHMENT_TYPES, getAttachmentCompatibility } from '../data/attachmentTypes';

const TYPE_ICONS = { grounding: '⚓', mindfulness: '🧘', communication: '💬', reflection: '📝', 'self-care': '🌸', planning: '📅', 'inner-child': '👶', 'emotion-regulation': '🌊' };
const TYPE_COLORS = { grounding: 'bg-teal-100 text-teal-700', mindfulness: 'bg-purple-100 text-purple-700', communication: 'bg-blue-100 text-blue-700', reflection: 'bg-amber-100 text-amber-700', 'self-care': 'bg-pink-100 text-pink-700', planning: 'bg-green-100 text-green-700', 'inner-child': 'bg-orange-100 text-orange-700', 'emotion-regulation': 'bg-indigo-100 text-indigo-700' };

export default function ExercisesPage({ result, onBack, onGoToCounseling }) {
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [selectedCompatType, setSelectedCompatType] = useState('secure');
  const [activeSection, setActiveSection] = useState('exercises');

  const typeData = ATTACHMENT_TYPES[result.type];
  const compatibility = getAttachmentCompatibility(result.type, selectedCompatType);

  const toggleExercise = (idx) => {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const sections = [
    { id: 'exercises', label: '실습 활동', icon: '🏋️' },
    { id: 'compatibility', label: '궁합 분석', icon: '💑' },
    { id: 'growth', label: '성장 가이드', icon: '🌱' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-calm-50 pb-10">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-bold text-gray-900 flex-1">성장 프로그램</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeData.badge}`}>
            {typeData.emoji} {typeData.name}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === s.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-200'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Exercises Section */}
        {activeSection === 'exercises' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 leading-relaxed">
                {typeData.name}을 위한 맞춤 실습 활동입니다.
                꾸준히 실천하면 더 건강한 관계 패턴을 형성할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {completedExercises.size} / {typeData.exercises.length} 완료
              </p>
              <div className="h-1.5 bg-gray-100 rounded-full flex-1 mx-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${(completedExercises.size / typeData.exercises.length) * 100}%` }}
                />
              </div>
            </div>

            {typeData.exercises.map((exercise, idx) => (
              <ExerciseCard
                key={idx}
                exercise={exercise}
                idx={idx}
                completed={completedExercises.has(idx)}
                onToggle={() => toggleExercise(idx)}
              />
            ))}

            <div className="bg-gradient-to-br from-primary-50 to-calm-50 border border-primary-100 rounded-2xl p-5 mt-4">
              <p className="text-sm font-semibold text-primary-700 mb-2">💡 실습 팁</p>
              <p className="text-sm text-primary-600 leading-relaxed">
                변화는 작은 실천에서 시작됩니다. 하루에 한 가지 활동부터 시작해보세요.
                일관된 연습이 새로운 신경 회로를 만들고 관계 패턴을 변화시킵니다.
              </p>
            </div>
          </div>
        )}

        {/* Compatibility Section */}
        {activeSection === 'compatibility' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="font-medium text-gray-900 mb-4">파트너의 애착 유형을 선택하세요</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(ATTACHMENT_TYPES).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedCompatType(type.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedCompatType === type.id
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{type.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{type.name}</p>
                        <p className="text-xs text-gray-400">{type.englishName}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Compatibility Result */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{typeData.emoji}</span>
                  <span className="text-gray-400 text-lg">+</span>
                  <span className="text-2xl">{ATTACHMENT_TYPES[selectedCompatType].emoji}</span>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${
                    compatibility.score >= 80 ? 'text-emerald-500' :
                    compatibility.score >= 60 ? 'text-amber-500' : 'text-red-400'
                  }`}>{compatibility.score}점</div>
                  <p className="text-xs text-gray-400">궁합 점수</p>
                </div>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    compatibility.score >= 80 ? 'bg-emerald-400' :
                    compatibility.score >= 60 ? 'bg-amber-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${compatibility.score}%` }}
                />
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{compatibility.description}</p>

              <div className="mt-4 p-3 bg-primary-50 rounded-xl">
                <p className="text-xs text-primary-600 leading-relaxed">
                  💜 모든 애착 유형 조합은 의식적인 노력과 이해를 통해 건강한 관계를 만들 수 있습니다.
                  점수는 상대적인 참고 자료일 뿐, 절대적인 기준이 아닙니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Growth Guide Section */}
        {activeSection === 'growth' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">📈 {typeData.name}을 위한 성장 로드맵</h3>

              <div className="space-y-4">
                <GrowthStep
                  step={1}
                  title="자기 인식 강화"
                  description="나의 애착 패턴을 인식하고 감정 일기를 작성하세요. 언제 애착 반응이 촉발되는지 파악합니다."
                  duration="1-2주"
                  color="bg-blue-50 border-blue-200"
                />
                <GrowthStep
                  step={2}
                  title="감정 조절 기술 개발"
                  description="마음챙김 명상, 호흡법, 자기 위로 기술을 연습하세요. 강렬한 감정이 올 때 일시 정지할 수 있는 능력을 키웁니다."
                  duration="2-4주"
                  color="bg-emerald-50 border-emerald-200"
                />
                <GrowthStep
                  step={3}
                  title="소통 패턴 개선"
                  description="비폭력 대화(NVC) 기술을 배우고, 욕구와 감정을 명확하게 표현하는 연습을 합니다."
                  duration="1-2개월"
                  color="bg-amber-50 border-amber-200"
                />
                <GrowthStep
                  step={4}
                  title="관계 패턴 재구성"
                  description="새로운 관계 경험을 통해 내적 작동 모델을 업데이트합니다. 필요하다면 전문 심리치료사의 도움을 받으세요."
                  duration="3-6개월+"
                  color="bg-purple-50 border-purple-200"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">📚 추천 자료</h3>
              <div className="space-y-3">
                {[
                  { title: '\"애착: 인간 애착 행동에 관한 심리학적 연구\"', author: '존 볼비', type: '📖 도서' },
                  { title: '\"홀로 서기의 심리학\"', author: '수 존슨', type: '📖 도서' },
                  { title: '\"불안 없이 사랑하기\"', author: '아미르 레빈, 레이철 헬러', type: '📖 도서' },
                ].map((book, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-lg">{book.type.split(' ')[0]}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author} · {book.type.split(' ')[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onGoToCounseling}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              💬 AI 상담사와 더 이야기하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, idx, completed, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const icon = TYPE_ICONS[exercise.type] || '✨';
  const color = TYPE_COLORS[exercise.type] || 'bg-gray-100 text-gray-700';

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all shadow-sm ${completed ? 'border-emerald-200' : 'border-gray-100'}`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={onToggle}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'
            }`}
          >
            {completed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>}
          </button>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-semibold text-gray-900 text-sm ${completed ? 'line-through text-gray-400' : ''}`}>
                {icon} {exercise.title}
              </h3>
              <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600 shrink-0">
                <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>{exercise.type}</span>
              <span className="text-xs text-gray-400">⏱ {exercise.duration}</span>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 pl-9">
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">
              {exercise.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function GrowthStep({ step, title, description, duration, color }) {
  return (
    <div className={`border rounded-2xl p-4 ${color}`}>
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-gray-700 shrink-0 shadow-sm">
          {step}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
            <span className="text-xs text-gray-500 bg-white/60 px-2 py-0.5 rounded-full">{duration}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
