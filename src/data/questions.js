// ECR-R(Experiences in Close Relationships-Revised) 기반 간소화 애착 유형 검사
// 7점 척도 (1: 전혀 그렇지 않다 ~ 7: 매우 그렇다)

export const QUESTIONS = [
  // 불안 차원 (Attachment Anxiety)
  {
    id: 1,
    text: '파트너가 나를 정말로 사랑하는지 걱정됩니다.',
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 2,
    text: '파트너가 나를 떠날까봐 걱정됩니다.',
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 3,
    text: '파트너가 나에게 연락하지 않으면 불안해집니다.',
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 4,
    text: '파트너에게 인정받고 싶은 욕구가 강합니다.',
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 5,
    text: '파트너와 갈등이 생기면 관계가 끝날 것 같아 두렵습니다.',
    dimension: 'anxiety',
    reversed: false,
  },
  {
    id: 6,
    text: '관계에서 나는 파트너보다 더 많이 투자한다고 느낍니다.',
    dimension: 'anxiety',
    reversed: false,
  },

  // 회피 차원 (Attachment Avoidance)
  {
    id: 7,
    text: '파트너와 너무 가까워지는 것이 불편합니다.',
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 8,
    text: '누군가에게 의존하는 것이 어렵습니다.',
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 9,
    text: '파트너가 너무 가까워지려 하면 물러서고 싶어집니다.',
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 10,
    text: '감정을 파트너와 나누는 것이 어렵습니다.',
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 11,
    text: '혼자 있는 것이 편하고, 타인과의 친밀함이 부담스럽습니다.',
    dimension: 'avoidance',
    reversed: false,
  },
  {
    id: 12,
    text: '도움이 필요할 때도 파트너에게 의지하기 어렵습니다.',
    dimension: 'avoidance',
    reversed: false,
  },

  // 안정 차원 (Security indicators)
  {
    id: 13,
    text: '파트너에게 나의 감정을 편안하게 이야기할 수 있습니다.',
    dimension: 'security',
    reversed: false,
  },
  {
    id: 14,
    text: '관계에서 나는 가치 있고 사랑받을 자격이 있다고 느낍니다.',
    dimension: 'security',
    reversed: false,
  },
  {
    id: 15,
    text: '파트너와 갈등이 생겨도 함께 해결할 수 있다고 믿습니다.',
    dimension: 'security',
    reversed: false,
  },
  {
    id: 16,
    text: '파트너와 함께 있으면서도 나만의 공간을 유지할 수 있습니다.',
    dimension: 'security',
    reversed: false,
  },

  // 혼란/두려움 차원 (Disorganized/Fearful indicators)
  {
    id: 17,
    text: '가까워지고 싶으면서도 동시에 두려움을 느낍니다.',
    dimension: 'disorganized',
    reversed: false,
  },
  {
    id: 18,
    text: '관계에서 내 감정이 매우 빠르게 변하는 것을 느낍니다.',
    dimension: 'disorganized',
    reversed: false,
  },
  {
    id: 19,
    text: '파트너를 완전히 신뢰하는 것이 어렵고 위험하게 느껴집니다.',
    dimension: 'disorganized',
    reversed: false,
  },
  {
    id: 20,
    text: '과거의 관계 경험이 현재 관계에 부정적인 영향을 미칩니다.',
    dimension: 'disorganized',
    reversed: false,
  },
];

export const SCALE_LABELS = [
  { value: 1, label: '전혀\n그렇지 않다' },
  { value: 2, label: '그렇지\n않다' },
  { value: 3, label: '약간\n그렇지 않다' },
  { value: 4, label: '보통이다' },
  { value: 5, label: '약간\n그렇다' },
  { value: 6, label: '그렇다' },
  { value: 7, label: '매우\n그렇다' },
];

export const calculateScores = (answers) => {
  const scores = {
    security: 0,
    anxiety: 0,
    avoidance: 0,
    disorganized: 0,
    counts: {
      security: 0,
      anxiety: 0,
      avoidance: 0,
      disorganized: 0,
    }
  };

  QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      const value = q.reversed ? 8 - answer : answer;
      scores[q.dimension] += value;
      scores.counts[q.dimension]++;
    }
  });

  // 평균 계산
  const averages = {
    security: scores.counts.security ? scores.security / scores.counts.security : 0,
    anxiety: scores.counts.anxiety ? scores.anxiety / scores.counts.anxiety : 0,
    avoidance: scores.counts.avoidance ? scores.avoidance / scores.counts.avoidance : 0,
    disorganized: scores.counts.disorganized ? scores.disorganized / scores.counts.disorganized : 0,
  };

  // 애착 유형 결정
  // 낮은 불안 + 낮은 회피 = 안정형
  // 높은 불안 + 낮은 회피 = 불안형
  // 낮은 불안 + 높은 회피 = 회피형
  // 높은 불안 + 높은 회피 = 혼란형
  const anxietyHigh = averages.anxiety > 4;
  const avoidanceHigh = averages.avoidance > 4;
  const disorganizedHigh = averages.disorganized > 4.5;

  let type;
  if (disorganizedHigh && (anxietyHigh || avoidanceHigh)) {
    type = 'disorganized';
  } else if (!anxietyHigh && !avoidanceHigh) {
    type = 'secure';
  } else if (anxietyHigh && !avoidanceHigh) {
    type = 'anxious';
  } else if (!anxietyHigh && avoidanceHigh) {
    type = 'avoidant';
  } else {
    type = 'disorganized';
  }

  return {
    type,
    averages,
    rawScores: scores,
  };
};
