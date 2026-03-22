export const ATTACHMENT_TYPES = {
  secure: {
    id: 'secure',
    name: '안정형',
    englishName: 'Secure Attachment',
    emoji: '🌿',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
    description: '당신은 관계에서 안정감을 느끼며, 친밀함과 독립성 사이의 균형을 잘 유지합니다.',
    longDescription: `안정형 애착을 가진 분들은 어린 시절 일관된 돌봄과 사랑을 받아 자신과 타인에 대한 긍정적인 내적 모델을 형성했습니다.
    관계에서 편안하게 친밀감을 느끼고, 상대방의 독립성도 존중할 수 있습니다.`,
    strengths: [
      '감정을 효과적으로 조절하는 능력',
      '건강한 경계 설정',
      '갈등을 건설적으로 해결하는 능력',
      '상대방에 대한 신뢰와 안도감',
      '친밀함과 독립성의 균형 유지',
    ],
    challenges: [
      '불안정한 애착 유형의 파트너와의 관계에서 혼란 경험',
      '과도한 독립성으로 인해 때로는 파트너가 거리감을 느낄 수 있음',
    ],
    relationshipPattern: '안정형은 건강한 방식으로 친밀한 관계를 형성하고 유지합니다. 의사소통이 명확하고, 갈등 시에도 차분하게 해결책을 찾습니다.',
    counselingTips: [
      '현재의 강점을 인식하고 더욱 발전시키세요',
      '불안정한 파트너를 도울 때 소진되지 않도록 경계를 유지하세요',
      '자신의 안정감이 관계의 치유적 힘이 될 수 있음을 기억하세요',
    ],
    exercises: [
      {
        title: '안정감 나누기',
        description: '파트너와 각자의 애착 유형에 대해 대화하고, 서로의 욕구를 이해하는 시간을 가져보세요.',
        duration: '30분',
        type: 'communication'
      },
      {
        title: '감사 일기',
        description: '매일 파트너와의 관계에서 감사한 3가지를 기록하고 공유해보세요.',
        duration: '10분/일',
        type: 'reflection'
      }
    ],
    imagePrompt: 'A serene, lush green garden with two intertwined trees growing strong roots together, warm sunlight filtering through leaves, peaceful and nurturing atmosphere, soft watercolor style, symbolizing secure attachment in relationships',
    affirmation: '나는 사랑받을 자격이 있고, 건강한 관계를 만들어갈 수 있습니다.',
  },

  anxious: {
    id: 'anxious',
    name: '불안형',
    englishName: 'Anxious Attachment',
    emoji: '🌊',
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
    description: '당신은 관계에서 깊은 연결을 갈망하지만, 버려질까봐 두려움을 느낄 수 있습니다.',
    longDescription: `불안형 애착을 가진 분들은 어린 시절 일관성 없는 돌봄을 경험하며 타인의 반응에 민감해졌습니다.
    관계에서 상대방의 사랑과 관심을 확인하고 싶은 욕구가 강하고, 분리에 대한 불안을 경험할 수 있습니다.`,
    strengths: [
      '깊은 공감 능력과 감수성',
      '관계에 대한 헌신과 열정',
      '파트너의 감정에 민감하게 반응하는 능력',
      '친밀감에 대한 강한 욕구',
    ],
    challenges: [
      '버려질 것에 대한 과도한 걱정',
      '파트너에게 과도하게 의존하는 경향',
      '작은 신호에도 거부감으로 해석',
      '질투심과 집착적인 생각',
      '자신의 욕구보다 파트너의 욕구를 우선시',
    ],
    relationshipPattern: '불안형은 관계에 매우 투자하지만, 파트너의 반응에 과도하게 민감합니다. 자주 확인을 구하거나, 갈등 상황에서 매달리거나 분노로 반응할 수 있습니다.',
    counselingTips: [
      '자신의 불안 패턴을 인식하고 감정 일기를 작성해보세요',
      '파트너에게 연락하기 전 잠시 멈추고 감정을 점검하세요',
      '자기 위로 기술(self-soothing)을 개발하세요',
      '개인 치료를 통해 어린 시절 경험을 탐색해보세요',
      '자신만의 취미와 관심사를 키워 독립성을 강화하세요',
    ],
    exercises: [
      {
        title: '불안 온도계',
        description: '파트너에게 메시지를 보내고 싶을 때, 불안의 강도를 0-10으로 평가하고 10분 기다린 후 다시 평가해보세요.',
        duration: '10-20분',
        type: 'mindfulness'
      },
      {
        title: '자기 위로 상자',
        description: '불안할 때 도움이 되는 활동 목록(음악 듣기, 차 마시기, 산책 등)을 만들고 실천해보세요.',
        duration: '필요할 때',
        type: 'self-care'
      },
      {
        title: '욕구 명확화',
        description: '"나는 ___가 필요해요"를 명확하게 표현하는 연습을 해보세요. 파트너에게 확인을 구하기 전에 먼저 자신의 욕구를 정확히 파악하세요.',
        duration: '일일 연습',
        type: 'communication'
      }
    ],
    imagePrompt: 'A person standing at the shore of a turbulent ocean, waves of blue and indigo, reaching toward the distant horizon, mixed emotions of longing and hope, impressionist painting style, symbolizing anxious attachment seeking connection',
    affirmation: '나는 혼자서도 완전하며, 내 가치는 타인의 반응에 달려있지 않습니다.',
  },

  avoidant: {
    id: 'avoidant',
    name: '회피형',
    englishName: 'Avoidant Attachment',
    emoji: '🏔️',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    description: '당신은 독립성을 중요시하며, 친밀함이 불편하게 느껴질 수 있습니다.',
    longDescription: `회피형 애착을 가진 분들은 어린 시절 감정적 욕구가 일관되게 무시되거나 거부된 경험을 통해,
    타인에 대한 의존을 최소화하는 방어 전략을 개발했습니다. 독립성과 자립을 매우 중요시합니다.`,
    strengths: [
      '강한 독립성과 자립심',
      '감정적으로 안정적으로 보이는 능력',
      '실용적이고 논리적인 문제 해결',
      '자신만의 공간과 취미 유지',
    ],
    challenges: [
      '친밀감이 불편하고 위협적으로 느껴짐',
      '감정 표현의 어려움',
      '파트너가 가까워지려 할 때 물러서는 경향',
      '도움 요청과 수용의 어려움',
      '관계에서 깊은 연결감을 느끼지 못함',
    ],
    relationshipPattern: '회피형은 독립적인 관계를 선호하며, 파트너가 너무 가까워지려 하면 거리를 두는 경향이 있습니다. 감정적 친밀감보다 실용적인 측면을 중시할 수 있습니다.',
    counselingTips: [
      '감정을 인식하고 이름 붙이는 연습을 해보세요',
      '취약함을 표현하는 것이 약함이 아니라 용기임을 기억하세요',
      '파트너와 함께하는 시간과 혼자만의 시간 모두가 소중함을 인식하세요',
      '어릴 때 감정 표현이 어떻게 다루어졌는지 탐색해보세요',
      '소통의 중요성 - 거리를 둘 때 파트너에게 설명해보세요',
    ],
    exercises: [
      {
        title: '감정 체크인',
        description: '하루에 3번, 현재 느끼는 감정을 5가지 단어로 기록해보세요. 감정 어휘를 늘리는 것이 목표입니다.',
        duration: '5분 × 3회',
        type: 'mindfulness'
      },
      {
        title: '취약함의 문',
        description: '파트너에게 매일 한 가지 작은 것을 부탁해보세요. "오늘 힘들었어" 같은 작은 공유부터 시작해보세요.',
        duration: '일일 연습',
        type: 'communication'
      },
      {
        title: '연결 vs 공간',
        description: '파트너와 함께 각자가 필요로 하는 연결의 시간과 혼자만의 공간을 협의하여 명시적인 약속을 만들어보세요.',
        duration: '1시간',
        type: 'planning'
      }
    ],
    imagePrompt: 'A solitary mountain peak above the clouds, strong and independent, with a small warm light in a cave indicating hidden warmth inside, dramatic landscape with soft golden light at dawn, oil painting style, symbolizing avoidant attachment with hidden emotional depth',
    affirmation: '나는 연결되면서도 나 자신을 유지할 수 있습니다. 취약함은 나의 강점입니다.',
  },

  disorganized: {
    id: 'disorganized',
    name: '혼란형',
    englishName: 'Disorganized Attachment',
    emoji: '🌀',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-800',
    description: '당신은 관계에서 친밀함을 원하면서도 동시에 두려움을 느끼는 복잡한 패턴을 가질 수 있습니다.',
    longDescription: `혼란형 애착을 가진 분들은 종종 어린 시절 돌봄 제공자가 동시에 위안과 두려움의 원천이었던 경험을 했습니다.
    이로 인해 관계에서 접근과 회피라는 상충되는 충동을 경험합니다. 이 유형은 트라우마와 자주 연관되어 있습니다.`,
    strengths: [
      '매우 깊은 공감 능력',
      '복잡한 감정에 대한 이해',
      '변화와 성장에 대한 강한 동기',
      '심층적인 자기 탐색 능력',
    ],
    challenges: [
      '관계에서 일관되지 않은 행동 패턴',
      '친밀함에 대한 강한 욕구와 동시에 두려움',
      '감정 조절의 어려움',
      '자해나 해리 등의 트라우마 반응',
      '자신과 타인에 대한 불안정한 내적 모델',
    ],
    relationshipPattern: '혼란형은 관계에서 예측 불가능한 패턴을 보일 수 있습니다. 극도로 가까워졌다가 갑자기 물러서거나, 상대방을 이상화했다가 평가절하하는 경향이 있을 수 있습니다.',
    counselingTips: [
      '전문적인 트라우마 치료(EMDR, TF-CBT 등)를 강력히 추천드립니다',
      '자신에 대한 깊은 연민(self-compassion)을 키워보세요',
      '지금 이 순간에 집중하는 마음챙김 연습이 도움됩니다',
      '안전한 치료 관계가 새로운 관계 경험을 제공할 수 있습니다',
      '위기 시 사용할 수 있는 안전 계획을 만들어두세요',
    ],
    exercises: [
      {
        title: '안전 닻 찾기',
        description: '현재 순간에 안전함을 느끼게 해주는 5가지 감각 경험(보이는 것, 들리는 것, 만져지는 것, 냄새, 맛)을 의식적으로 탐색해보세요.',
        duration: '10분',
        type: 'grounding'
      },
      {
        title: '내 안의 어린아이에게',
        description: '어릴 때의 자신에게 편지를 써보세요. 그 아이가 필요했지만 받지 못한 것을 지금의 당신이 제공해주세요.',
        duration: '30분',
        type: 'inner-child'
      },
      {
        title: '감정 파도 타기',
        description: '강한 감정이 올 때 저항하지 말고 파도처럼 관찰해보세요. "지금 나는 ___를 느끼고 있고, 이 감정은 지나갈 것이다"라고 말해보세요.',
        duration: '필요할 때',
        type: 'emotion-regulation'
      }
    ],
    imagePrompt: 'An abstract swirling galaxy of purple and pink hues, with a small bright star at the center finding its place in the cosmos, beautiful chaos becoming ordered, digital art style, symbolizing disorganized attachment finding healing and wholeness',
    affirmation: '내 과거가 나를 정의하지 않습니다. 나는 매 순간 새로운 선택을 할 수 있습니다.',
  }
};

export const getAttachmentType = (scores) => {
  const { secure, anxious, avoidant, disorganized } = scores;
  const maxScore = Math.max(secure, anxious, avoidant, disorganized);

  if (maxScore === secure) return 'secure';
  if (maxScore === anxious) return 'anxious';
  if (maxScore === avoidant) return 'avoidant';
  return 'disorganized';
};

export const getAttachmentCompatibility = (type1, type2) => {
  const compatibility = {
    'secure-secure': { score: 95, description: '최상의 궁합입니다. 두 사람 모두 안정적인 기반을 제공하며 서로를 지지할 수 있습니다.' },
    'secure-anxious': { score: 75, description: '안정형이 불안형에게 안도감을 제공할 수 있지만, 불안형의 욕구가 때로는 부담이 될 수 있습니다.' },
    'secure-avoidant': { score: 70, description: '안정형의 인내심이 회피형이 서서히 열릴 수 있는 공간을 만들어줄 수 있습니다.' },
    'secure-disorganized': { score: 65, description: '안정형의 일관성이 혼란형에게 치유적인 경험이 될 수 있습니다.' },
    'anxious-anxious': { score: 50, description: '두 사람 모두 안심을 구하며, 불안이 서로를 강화할 수 있습니다.' },
    'anxious-avoidant': { score: 40, description: '불안형의 추구와 회피형의 거리두기가 서로의 패턴을 강화할 수 있어 주의가 필요합니다.' },
    'anxious-disorganized': { score: 45, description: '두 유형 모두 관계에서의 불안정성을 경험하며, 치료적 지원이 필요할 수 있습니다.' },
    'avoidant-avoidant': { score: 55, description: '두 사람 모두 독립성을 중시하지만, 깊은 연결을 만들기 어려울 수 있습니다.' },
    'avoidant-disorganized': { score: 45, description: '복잡한 역동을 가질 수 있으며, 전문적인 커플 상담이 도움될 수 있습니다.' },
    'disorganized-disorganized': { score: 40, description: '두 사람 모두 상당한 개인 치료 작업이 먼저 이루어진 후 관계를 발전시키는 것이 좋습니다.' },
  };

  const key1 = `${type1}-${type2}`;
  const key2 = `${type2}-${type1}`;
  return compatibility[key1] || compatibility[key2] || { score: 60, description: '각자의 패턴을 이해하고 의식적으로 소통하는 것이 중요합니다.' };
};
