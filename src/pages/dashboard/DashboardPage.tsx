import { Link } from 'react-router-dom';
import { CheckCircle, Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { agentLogs, holdings } from '../../data/dummy';

function getSummaryCards() {
  const initial = Number(localStorage.getItem('initialInvestment') || 10000000);
  const gain = Math.round(initial * 0.124);
  const todayGain = Math.round(initial * 0.0068);
  const evaluated = initial + gain;

  return [
    { label: '평가금액', value: `₩${evaluated.toLocaleString()}`, sub: null, color: '' },
    { label: '오늘 수익', value: `+₩${todayGain.toLocaleString()}`, sub: '+0.68%', color: 'text-emerald-600' },
    { label: '누적 수익률', value: '+12.4%', sub: `+₩${gain.toLocaleString()}`, color: 'text-emerald-600' },
    { label: '보유 종목', value: '5개', sub: null, color: '' },
  ];
}

function pct(avg: number, cur: number) {
  return (((cur - avg) / avg) * 100).toFixed(1);
}

export default function DashboardPage() {
  const summaryCards = getSummaryCards();

  return (
    <DashboardLayout title="대시보드" subtitle="오늘도 AI가 시장을 분석하고 있습니다.">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {summaryCards.map((c) => (
          <div key={c.label} className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-5">
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            <p className={`text-2xl font-bold ${c.color || 'text-gray-900'}`}>{c.value}</p>
            {c.sub && <p className={`text-xs mt-0.5 ${c.color}`}>{c.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Agent Logs */}
        <div className="col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">오늘 AI 에이전트 활동</h2>
          <div className="space-y-3">
            {agentLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs text-gray-400 w-12 flex-shrink-0 pt-0.5">{log.time}</span>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{log.message}</span>
                  {log.status === 'done' ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0 ml-3">
                      <CheckCircle size={11} /> 완료
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full animate-pulse flex-shrink-0 ml-3">
                      <Loader2 size={11} className="animate-spin" /> 진행중
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col">
          <h2 className="font-semibold text-gray-900 mb-3">오늘의 리포트</h2>
          <p className="text-xs text-gray-400 mb-3">2026-06-07 오전 08:00</p>
          <p className="text-sm text-gray-600 leading-relaxed flex-1">
            반도체 관련 기업들이 긍정적인 평가를 받는 가운데, 일부 기업은 시장의 우려 섞인 시선과
            실제 주가 움직임이 서로 다르게 나타나고 있습니다.
          </p>
          <Link
            to="/reports"
            className="mt-4 block text-center bg-indigo-50 text-indigo-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            전체 리포트 보기
          </Link>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">보유 종목</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-50">
              <th className="text-left pb-3 font-medium">종목명</th>
              <th className="text-left pb-3 font-medium">코드</th>
              <th className="text-right pb-3 font-medium">평균단가</th>
              <th className="text-right pb-3 font-medium">현재가</th>
              <th className="text-right pb-3 font-medium">수익률</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const p = parseFloat(pct(h.avgPrice, h.currentPrice));
              const isUp = p >= 0;
              const fmt = (v: number) =>
                h.currency === 'KRW' ? `₩${v.toLocaleString()}` : `$${v.toFixed(2)}`;
              return (
                <tr key={h.code} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 font-medium text-gray-800">{h.name}</td>
                  <td className="py-3 text-gray-400">{h.code}</td>
                  <td className="py-3 text-right text-gray-600">{fmt(h.avgPrice)}</td>
                  <td className="py-3 text-right text-gray-600">{fmt(h.currentPrice)}</td>
                  <td className={`py-3 text-right font-semibold flex items-center justify-end gap-0.5 ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {isUp ? '+' : ''}{p}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
