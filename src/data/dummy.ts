export const holdings = [
  { name: 'SK하이닉스', code: '000660', avgPrice: 178000, currentPrice: 195400, currency: 'KRW' },
  { name: '삼성전자', code: '005930', avgPrice: 68200, currentPrice: 74100, currency: 'KRW' },
  { name: '마이크로소프트', code: 'MSFT', avgPrice: 385.2, currentPrice: 421.5, currency: 'USD' },
  { name: 'NAVER', code: '035420', avgPrice: 215000, currentPrice: 198700, currency: 'KRW' },
  { name: '테슬라', code: 'TSLA', avgPrice: 245.0, currentPrice: 287.3, currency: 'USD' },
];

export const agentLogs = [
  { time: '08:00', message: '오늘 시장 뉴스 수집을 완료했어요 (34건)', status: 'done' },
  { time: '08:02', message: 'SK하이닉스·삼성전자 뉴스 분위기를 분석했어요', status: 'done' },
  { time: '08:05', message: '모멘텀 신호가 강한 종목 5개를 선별했어요', status: 'done' },
  { time: '08:08', message: '포트폴리오 비중을 최신 신호에 맞게 조정했어요', status: 'done' },
  { time: '18:00', message: '장 마감 리포트를 작성하고 있어요...', status: 'running' },
];

export const portfolioWeights = [
  { name: 'SK하이닉스', value: 25, color: '#4F46E5' },
  { name: '삼성전자', value: 20, color: '#3B82F6' },
  { name: 'MSFT', value: 20, color: '#7C3AED' },
  { name: 'NAVER', value: 15, color: '#64748B' },
  { name: 'TSLA', value: 10, color: '#F59E0B' },
  { name: '현금', value: 10, color: '#9CA3AF' },
];

export const portfolioReasons = [
  { name: 'SK하이닉스', code: '000660', weight: 25, reason: '최근 3개월간 업종 내 주가 상승세 1위. 반도체 수요 회복과 맞물려 상승 흐름이 이어지고 있습니다.' },
  { name: '삼성전자', code: '005930', weight: 20, reason: '반도체 회복 흐름을 타며 최근 고점을 넘어선 상태로, 상승 추세가 유효합니다.' },
  { name: '마이크로소프트', code: 'MSFT', weight: 20, reason: 'AI 서비스 확장 기대감으로 꾸준히 오르는 중. 최근 3주 연속 상승하며 강한 흐름을 유지하고 있습니다.' },
  { name: 'NAVER', code: '035420', weight: 15, reason: '하락 폭이 줄어들며 반등 흐름이 시작되는 구간. 저점 대비 회복 신호가 감지되고 있습니다.' },
  { name: '테슬라', code: 'TSLA', weight: 10, reason: '전기차 시장 회복 기대와 함께 최근 상승세가 뚜렷해지고 있습니다.' },
  { name: '현금', code: '-', weight: 10, reason: '시장 변동성이 높을 때 빠르게 대응할 수 있도록 여유 자금을 확보합니다.' },
];

// Backtest data: portfolio vs KOSPI (2024-01 ~ 2025-06)
export const backtestData = [
  { month: '2024-01', portfolio: 0, kospi: 0 },
  { month: '2024-02', portfolio: 3.2, kospi: 1.8 },
  { month: '2024-03', portfolio: 5.8, kospi: 2.4 },
  { month: '2024-04', portfolio: 4.1, kospi: 0.9 },
  { month: '2024-05', portfolio: 7.3, kospi: 3.1 },
  { month: '2024-06', portfolio: 9.8, kospi: 4.2 },
  { month: '2024-07', portfolio: 12.1, kospi: 5.5 },
  { month: '2024-08', portfolio: 10.4, kospi: 3.8 },
  { month: '2024-09', portfolio: 13.7, kospi: 5.9 },
  { month: '2024-10', portfolio: 15.2, kospi: 6.7 },
  { month: '2024-11', portfolio: 18.4, kospi: 7.3 },
  { month: '2024-12', portfolio: 16.9, kospi: 5.8 },
  { month: '2025-01', portfolio: 19.3, kospi: 7.1 },
  { month: '2025-02', portfolio: 21.8, kospi: 8.4 },
  { month: '2025-03', portfolio: 20.1, kospi: 6.9 },
  { month: '2025-04', portfolio: 23.5, kospi: 8.8 },
  { month: '2025-05', portfolio: 26.2, kospi: 9.6 },
  { month: '2025-06', portfolio: 28.7, kospi: 10.2 },
];

export const tradeHistory = [
  { date: '2026-06-07', time: '14:32', stock: 'SK하이닉스', code: '000660', type: 'buy', qty: 10, price: 195400, currency: 'KRW', pnl: null },
  { date: '2026-06-07', time: '13:15', stock: '테슬라', code: 'TSLA', type: 'sell', qty: 5, price: 287.3, currency: 'USD', pnl: 211.5 },
  { date: '2026-06-07', time: '11:40', stock: '삼성전자', code: '005930', type: 'buy', qty: 20, price: 74100, currency: 'KRW', pnl: null },
  { date: '2026-06-07', time: '09:05', stock: 'NAVER', code: '035420', type: 'buy', qty: 15, price: 198700, currency: 'KRW', pnl: null },
  { date: '2026-06-06', time: '15:20', stock: 'MSFT', code: 'MSFT', type: 'sell', qty: 3, price: 421.5, currency: 'USD', pnl: 108.9 },
  { date: '2026-06-06', time: '10:00', stock: 'SK하이닉스', code: '000660', type: 'buy', qty: 5, price: 190000, currency: 'KRW', pnl: null },
  { date: '2026-06-05', time: '14:00', stock: '삼성전자', code: '005930', type: 'sell', qty: 10, price: 72000, currency: 'KRW', pnl: 38000 },
  { date: '2026-06-05', time: '09:30', stock: '테슬라', code: 'TSLA', type: 'buy', qty: 2, price: 280.0, currency: 'USD', pnl: null },
  { date: '2026-06-04', time: '13:45', stock: 'NAVER', code: '035420', type: 'sell', qty: 8, price: 205000, currency: 'KRW', pnl: -80000 },
  { date: '2026-06-04', time: '10:15', stock: 'MSFT', code: 'MSFT', type: 'buy', qty: 4, price: 412.0, currency: 'USD', pnl: null },
  { date: '2026-06-03', time: '11:00', stock: 'SK하이닉스', code: '000660', type: 'buy', qty: 8, price: 185000, currency: 'KRW', pnl: null },
  { date: '2026-06-03', time: '09:10', stock: '삼성전자', code: '005930', type: 'buy', qty: 15, price: 70000, currency: 'KRW', pnl: null },
];

// Daily cumulative return (last 30 days)
export const dailyReturn = Array.from({ length: 30 }, (_, i) => {
  const date = new Date('2026-05-09');
  date.setDate(date.getDate() + i);
  const base = i * 0.42 + Math.sin(i * 0.5) * 1.2;
  return {
    date: date.toISOString().slice(0, 10),
    return: parseFloat(base.toFixed(2)),
  };
});

// Momentum signal breakdown (replaces multi-strategy contrib)
export const signalContrib = [
  { name: '가격 모멘텀', value: 7.2 },
  { name: '거래량 신호', value: 2.8 },
  { name: '뉴스 센티멘트', value: 2.4 },
];

export const morningReport = {
  reportId: 'RPT-20260607-AM',
  type: 'MORNING',
  generatedAt: '2026-06-07T08:00:00',
  summary:
    '반도체 관련 기업들이 긍정적인 평가를 받는 가운데, 일부 기업은 시장의 우려 섞인 시선과 실제 주가 움직임이 서로 다르게 나타나고 있습니다.',
  stocks: [
    {
      name: 'SK하이닉스',
      code: '000660',
      market: 'KRX',
      sentiment: 'positive',
      priceSignal: 'up',
      newsSignal: 'positive',
      description:
        '최근 반도체 분야의 전반적인 분위기가 좋아 긍정적인 소식이 들려오고 있습니다. 주가 또한 강하게 오르고 있는 흐름을 보이고 있어 시장의 기대를 받고 있습니다.',
    },
    {
      name: '마이크로소프트',
      code: 'MSFT',
      market: 'NASDAQ',
      sentiment: 'positive',
      priceSignal: 'up',
      newsSignal: 'neutral',
      description:
        '뉴스 분위기는 중립적인 편이지만, 주가는 강하게 오르고 있는 힘이 확인됩니다.',
    },
    {
      name: '현대차',
      code: '005380',
      market: 'KRX',
      sentiment: 'warning',
      priceSignal: 'up',
      newsSignal: 'negative',
      description:
        '최근 부정적인 뉴스가 많음에도 불구하고 주가는 강하게 오르고 있습니다. 뉴스와 실제 주가 흐름이 엇갈리고 있어 주의 깊게 살펴봐야 합니다.',
    },
    {
      name: '삼성전자',
      code: '005930',
      market: 'KRX',
      sentiment: 'positive',
      priceSignal: 'up',
      newsSignal: 'positive',
      description:
        '반도체 분야의 긍정적인 기운을 받아 좋은 소식이 들려오고 있으며, 주가 역시 강하게 오르고 있어 투자자들의 주목을 받고 있습니다.',
    },
    {
      name: 'NAVER',
      code: '035420',
      market: 'KRX',
      sentiment: 'warning',
      priceSignal: 'up',
      newsSignal: 'negative',
      description:
        '최근 부정적인 뉴스가 많아 시장에서 우려의 목소리가 나오고 있습니다. 그럼에도 불구하고 주가는 강하게 오르고 있어 뉴스와 실제 주가 흐름이 엇갈리고 있습니다.',
    },
  ],
  warnings: [
    '현대차(005380)와 NAVER(035420)는 뉴스와 실제 주가 흐름이 엇갈리고 있습니다.',
    '구글(GOOGL)은 시장에서 우려의 목소리가 나오고 있으므로 지금 당장 사기보다 조금 더 지켜보는 것이 좋을 수 있습니다.',
    '테슬라(TSLA)와 엔비디아(NVDA) 등 일부 종목은 시장의 관심이 매우 높아 앞으로 주가가 크게 오르내릴 수 있습니다.',
  ],
};
