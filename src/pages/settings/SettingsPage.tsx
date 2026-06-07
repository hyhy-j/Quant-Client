import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${value ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState({
    morningReport: true,
    priceAlert: true,
    rebalance: false,
    email: true,
  });
  const [maxWeight, setMaxWeight] = useState(20);
  const [dailyLimit, setDailyLimit] = useState(2000000);
  const [stopLoss, setStopLoss] = useState(15);

  const toggle = (k: keyof typeof notifs) =>
    setNotifs((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <DashboardLayout title="설정" subtitle="알림 및 리스크 한도를 설정합니다.">
      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">내 프로필</h2>
          <div className="space-y-3">
            {[
              { label: '이름', value: '이현정' },
              { label: '이메일', value: 'hyeonjeong@example.com' },
              { label: '투자 성향', value: '중립형' },
              { label: '전략', value: '모멘텀 전략' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/onboarding')}
            className="mt-5 w-full border border-indigo-200 text-indigo-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            성향 다시 설문하기
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">알림 설정</h2>
          <div className="space-y-4">
            {[
              { key: 'morningReport' as const, label: '시장 리포트 알림', sub: '08:00 / 18:00' },
              { key: 'priceAlert' as const, label: '급등락 알림', sub: '±5% 이상' },
              { key: 'rebalance' as const, label: '리밸런싱 알림', sub: '매주 월요일 포트폴리오 조정 시' },
              { key: 'email' as const, label: '이메일 수신', sub: '리포트 이메일' },
            ].map(({ key, label, sub }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
                <Toggle value={notifs[key]} onChange={() => toggle(key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Risk Limits */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">리스크 한도 설정</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-800">단일 종목 비중 한도</label>
                <span className="text-sm font-bold text-indigo-600">{maxWeight}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                value={maxWeight}
                onChange={(e) => setMaxWeight(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-800">일일 거래 한도</label>
                <span className="text-sm font-bold text-indigo-600">₩{dailyLimit.toLocaleString()}</span>
              </div>
              <input
                type="number"
                step={100000}
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-800">전체 손실 자동 중단</label>
                <span className="text-sm font-bold text-red-500">-{stopLoss}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>
          </div>

          <button className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
            저장하기
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
