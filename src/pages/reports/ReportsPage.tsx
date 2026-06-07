import { useState } from 'react';
import { Lightbulb, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';
import { morningReport, tradeHistory, dailyReturn, signalContrib } from '../../data/dummy';

const tabs = ['시장 리포트', '거래 내역', '수익 분석'];
const sentimentConfig = {
  positive: { label: '긍정', cls: 'bg-emerald-50 text-emerald-700' },
  warning: { label: '주의', cls: 'bg-amber-50 text-amber-700' },
  negative: { label: '부정', cls: 'bg-red-50 text-red-500' },
} as const;

export default function ReportsPage() {
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState('today');
  const [tradeFilter, setTradeFilter] = useState('all');

  return (
    <DashboardLayout title="리포트" subtitle="AI가 생성한 시장 분석 리포트입니다.">
      {/* Tab Bar */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              tab === i ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab 0: Market Report */}
      {tab === 0 && (
        <div className="space-y-4">
          <div className="flex gap-2 mb-2">
            {['today', 'yesterday', 'week'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filter === f ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {f === 'today' ? '오늘' : f === 'yesterday' ? '어제' : '이번 주'}
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex gap-3 items-start">
            <Lightbulb className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-xs text-gray-400 mb-1">2026-06-07 오전 08:00 · 장 개장 전 리포트</p>
              <p className="text-sm text-gray-700 leading-relaxed">{morningReport.summary}</p>
            </div>
          </div>

          {/* Stock Cards */}
          <h3 className="font-semibold text-gray-800 text-sm mt-2">오늘의 주요 종목 동향</h3>
          <div className="grid grid-cols-2 gap-3">
            {morningReport.stocks.map((s) => {
              const sc = sentimentConfig[s.sentiment as keyof typeof sentimentConfig];
              return (
                <div key={s.code} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900">{s.name}</span>
                      <span className="text-xs text-gray-400 ml-2">{s.code}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sc.cls}`}>
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{s.description}</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md">
                      주가 {s.priceSignal === 'up' ? '↑ 상승' : '↓ 하락'}
                    </span>
                    <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md">
                      뉴스 {s.newsSignal === 'positive' ? '긍정' : s.newsSignal === 'negative' ? '부정' : '중립'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warnings */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-amber-500" size={16} />
              <span className="font-semibold text-amber-800 text-sm">오늘 투자 시 주의할 점</span>
            </div>
            <ul className="space-y-2">
              {morningReport.warnings.map((w, i) => (
                <li key={i} className="text-sm text-amber-700 flex gap-2">
                  <span>•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 1: Trade History */}
      {tab === 1 && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex gap-2 mb-4">
            {['all', 'month', 'week'].map((f) => (
              <button
                key={f}
                onClick={() => setTradeFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  tradeFilter === f ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {f === 'all' ? '전체 기간' : f === 'month' ? '이번 달' : '이번 주'}
              </button>
            ))}
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-50">
                <th className="text-left pb-3 font-medium">날짜</th>
                <th className="text-left pb-3 font-medium">종목</th>
                <th className="text-left pb-3 font-medium">유형</th>
                <th className="text-right pb-3 font-medium">수량</th>
                <th className="text-right pb-3 font-medium">체결가</th>
                <th className="text-right pb-3 font-medium">손익</th>
              </tr>
            </thead>
            <tbody>
              {tradeHistory.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 text-gray-400 text-xs">{t.date}</td>
                  <td className="py-2.5 font-medium text-gray-800">{t.stock}</td>
                  <td className="py-2.5">
                    <span className={`flex items-center gap-0.5 text-xs font-semibold ${t.type === 'buy' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {t.type === 'buy' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {t.type === 'buy' ? '매수' : '매도'}
                    </span>
                  </td>
                  <td className="py-2.5 text-right text-gray-600">{t.qty}</td>
                  <td className="py-2.5 text-right text-gray-600">
                    {t.currency === 'KRW' ? `₩${t.price.toLocaleString()}` : `$${t.price}`}
                  </td>
                  <td className="py-2.5 text-right">
                    {t.pnl != null ? (
                      <span className={`font-semibold ${t.pnl >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {t.pnl >= 0 ? '+' : ''}
                        {t.currency === 'KRW' ? `₩${t.pnl.toLocaleString()}` : `$${t.pnl}`}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Profit Analysis */}
      {tab === 2 && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">일별 누적 수익률 (최근 30일)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={dailyReturn} margin={{ top: 4, right: 20, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={6} />
                <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="return" name="수익률" stroke="#4F46E5" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-1">모멘텀 신호별 수익 기여도</h3>
            <p className="text-xs text-gray-400 mb-4">어떤 신호가 수익에 얼마나 기여했는지 보여줍니다.</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={signalContrib} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
                <Tooltip formatter={(v) => `+${v}%`} />
                <Bar dataKey="value" name="기여도" fill="#4F46E5" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
