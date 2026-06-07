import { useState } from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { morningReport } from '../../data/dummy';

const sentimentConfig = {
  positive: { label: '긍정', cls: 'bg-emerald-50 text-emerald-700' },
  warning: { label: '주의', cls: 'bg-amber-50 text-amber-700' },
  negative: { label: '부정', cls: 'bg-red-50 text-red-500' },
} as const;

export default function ReportsPage() {
  const [filter, setFilter] = useState('today');

  return (
    <DashboardLayout title="리포트" subtitle="AI가 생성한 시장 분석 리포트입니다.">
      <div className="space-y-4">
        <div className="flex gap-2">
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
        <h3 className="font-semibold text-gray-800 text-sm">오늘의 주요 종목 동향</h3>
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
    </DashboardLayout>
  );
}
