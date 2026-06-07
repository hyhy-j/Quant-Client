import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer,
} from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';
import TooltipBox from '../../components/Tooltip';
import { portfolioWeights, portfolioReasons, backtestData } from '../../data/dummy';

const TOOLTIPS: Record<string, string> = {
  '모멘텀 전략': '최근 수익률이 높은 종목이 앞으로도 계속 오를 가능성이 높다는 원리를 활용하는 전략입니다. AI가 가격·거래량·뉴스 신호를 종합해 모멘텀이 강한 종목을 자동으로 선별합니다.',
  '예상 수익률': '백테스트 기반으로 예측한 연간 수익률 범위입니다. 실제 수익을 보장하지 않습니다.',
  'MDD': '최대 낙폭(Maximum DrawDown). 전략 운용 중 발생할 수 있는 최대 손실 폭을 의미합니다.',
  '샤프지수': '위험 대비 수익 효율을 나타내는 지표입니다. 높을수록 같은 리스크로 더 많은 수익을 올린다는 의미입니다.',
  '리밸런싱 주기': '포트폴리오 비중을 다시 맞추는 주기입니다. 매주 모멘텀 신호를 재분석해 종목과 비중을 조정합니다.',
  '모멘텀 룩백 기간': '모멘텀 신호를 계산할 때 참고하는 과거 기간입니다. 3개월 기준으로 수익률이 높은 종목을 선별합니다.',
  '가격 모멘텀': '최근 3개월간 주가 상승 흐름의 강도입니다. 점수가 높을수록 상승 추세가 강합니다.',
  '거래량 신호': '최근 거래량 증가 추세를 나타냅니다. 거래량이 늘면 시장의 관심이 높아졌다는 신호입니다.',
  '뉴스 센티멘트': 'AI가 분석한 뉴스 감성 점수입니다. 긍정적인 뉴스가 많을수록 점수가 높습니다.',
};

const riskMetrics = [
  { label: '예상 수익률', value: '+14.2% ~ +22.8%', color: 'text-emerald-600' },
  { label: 'MDD', value: '-8.3%', color: 'text-red-500' },
  { label: '샤프지수', value: '1.42', color: 'text-gray-900' },
  { label: '리밸런싱 주기', value: '매주 월요일', color: 'text-gray-900' },
  { label: '모멘텀 룩백 기간', value: '3개월', color: 'text-gray-900' },
  { label: '보유 종목 수', value: '5종목', color: 'text-gray-900' },
];

const signalBars = [
  { name: '가격 모멘텀', pct: 82, color: 'bg-indigo-500' },
  { name: '거래량 신호', pct: 65, color: 'bg-blue-400' },
  { name: '뉴스 센티멘트', pct: 71, color: 'bg-purple-400' },
];

export default function PortfolioPage() {
  return (
    <DashboardLayout title="포트폴리오" subtitle="모멘텀 전략 기반 맞춤 포트폴리오입니다.">
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
          중립형 투자자
        </span>
        <TooltipBox content={TOOLTIPS['모멘텀 전략']} showIcon dir="down">
          <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full cursor-default">
            모멘텀 전략
          </span>
        </TooltipBox>
        <span className="text-xs text-gray-400">마지막 업데이트: 2026-06-07 08:08</span>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        {/* Pie Chart + Reasons */}
        <div className="col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">포트폴리오 구성</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={portfolioWeights}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  strokeWidth={2}
                >
                  {portfolioWeights.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {portfolioWeights.map((w) => (
                <div key={w.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: w.color }} />
                  <span className="text-sm text-gray-700 flex-1">{w.name}</span>
                  <span className="text-sm font-semibold text-gray-800">{w.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-xs text-gray-400 mb-3">종목별 편입 근거</p>
            {portfolioReasons.map((r) => (
              <div key={r.code} className="bg-gray-50 rounded-xl px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-semibold text-sm text-gray-800">{r.name}</span>
                    <span className="text-xs text-gray-400">{r.code}</span>
                  </div>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    {r.weight}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">{r.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Metrics + Signal Bars */}
        <div className="col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">전략 지표</h2>
            <p className="text-xs text-gray-400 mb-4">모멘텀 전략 · 3개월 룩백 기준</p>
            <div className="space-y-4">
              {riskMetrics.map((m) => (
                <div key={m.label} className="flex justify-between items-center">
                  <TooltipBox content={TOOLTIPS[m.label] || ''} showIcon={!!TOOLTIPS[m.label]}>
                    <span className="text-sm text-gray-500 cursor-default">{m.label}</span>
                  </TooltipBox>
                  <span className={`font-bold ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-50">
              <p className="text-xs text-gray-400 mb-3">모멘텀 신호 강도</p>
              {signalBars.map((s) => (
                <div key={s.name} className="mb-2.5">
                  <div className="flex justify-between mb-1">
                    <TooltipBox content={TOOLTIPS[s.name] || ''} showIcon>
                      <span className="text-xs text-gray-600 cursor-default">{s.name}</span>
                    </TooltipBox>
                    <span className="text-xs text-gray-600">{s.pct}점</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backtest Chart */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900">백테스트 수익률 (2024-01 ~ 2025-06)</h2>
          <p className="text-xs text-gray-400 mt-1">
            모멘텀 전략을 과거에 적용했을 때의 가상 성과입니다. 실제 수익을 보장하지 않습니다.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={backtestData} margin={{ top: 4, right: 20, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={2} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
            <RechartsTooltip formatter={(v) => `${v}%`} />
            <Legend />
            <Line type="monotone" dataKey="portfolio" name="모멘텀 전략" stroke="#4F46E5" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="kospi" name="코스피" stroke="#94A3B8" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
