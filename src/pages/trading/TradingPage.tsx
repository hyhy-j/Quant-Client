import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

interface Trade {
  time: string;
  stock: string;
  type: 'buy' | 'sell';
  qty: number;
  price: string;
  currency: 'KRW' | 'USD';
}

// 초기 체결 내역 (하드코딩)
const INITIAL_TRADES: Trade[] = [
  { time: '14:32', stock: 'SK하이닉스', type: 'buy',  qty: 10, price: '195,400', currency: 'KRW' },
  { time: '13:15', stock: '테슬라',     type: 'sell', qty: 5,  price: '$287.30', currency: 'USD' },
  { time: '11:40', stock: '삼성전자',   type: 'buy',  qty: 20, price: '74,100',  currency: 'KRW' },
  { time: '09:05', stock: 'NAVER',      type: 'buy',  qty: 15, price: '198,700', currency: 'KRW' },
  { time: '09:01', stock: 'MSFT',       type: 'sell', qty: 3,  price: '$421.50', currency: 'USD' },
  { time: '08:55', stock: 'SK하이닉스', type: 'buy',  qty: 5,  price: '190,000', currency: 'KRW' },
];

// 종목별 현재가 매핑
const PRICES: Record<string, { price: string; currency: 'KRW' | 'USD' }> = {
  'SK하이닉스': { price: '195,400', currency: 'KRW' },
  '삼성전자':   { price: '74,100',  currency: 'KRW' },
  'NAVER':      { price: '198,700', currency: 'KRW' },
  '테슬라':     { price: '$287.30', currency: 'USD' },
  'MSFT':       { price: '$421.50', currency: 'USD' },
};

// 잔고 관련 상수
const INITIAL_BALANCE = 5240000;
const TRADE_COST_KRW = 195400 * 1; // 기본 1주치 KRW 비용 근사값

export default function TradingPage() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [stock, setStock] = useState('');
  const [qty, setQty] = useState(1);
  const [trades, setTrades] = useState<Trade[]>(INITIAL_TRADES);
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [pnl, setPnl] = useState(1240000);

  const initial = Number(localStorage.getItem('initialInvestment') || 10000000);
  const invested = Math.round(initial * 0.579);

  const handleOrder = () => {
    if (!stock.trim()) return toast.error('종목을 입력해주세요');

    const priceInfo = PRICES[stock] ?? { price: '195,400', currency: 'KRW' as const };
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTrade: Trade = {
      time: timeStr,
      stock: stock.trim(),
      type: side,
      qty,
      price: priceInfo.price,
      currency: priceInfo.currency,
    };

    setTrades((prev) => [newTrade, ...prev]);

    // 잔고 변동: 매수 시 감소, 매도 시 증가
    const delta = Math.round(TRADE_COST_KRW * qty * (side === 'buy' ? -0.8 : 0.8));
    setBalance((prev) => Math.max(0, prev + delta));
    setPnl((prev) => prev + Math.round(Math.random() * 30000 * (side === 'sell' ? 1 : -0.3)));

    toast.success(`${stock} ${qty}주 ${side === 'buy' ? '매수' : '매도'} 체결 완료!`);
    setStock('');
    setQty(1);
  };

  return (
    <DashboardLayout title="매매" subtitle="AI가 추천한 종목을 거래하세요.">
      <Toaster position="top-right" />
      <div className="grid grid-cols-2 gap-4">
        {/* Left */}
        <div className="space-y-4">
          {/* Order Form */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">주문</h2>

            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">종목 검색</label>
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="예: SK하이닉스, 테슬라, MSFT"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {/* Quick pick */}
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1.5">인기 종목</p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(PRICES).map((name) => (
                    <button
                      key={name}
                      onClick={() => setStock(name)}
                      className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">주문 유형</label>
              <div className="flex rounded-xl overflow-hidden border border-gray-200">
                {(['market', 'limit'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      orderType === t ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {t === 'market' ? '시장가' : '지정가'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">수량</label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-4">
              {(['buy', 'sell'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                    side === s
                      ? s === 'buy' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {s === 'buy' ? '매수' : '매도'}
                </button>
              ))}
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              주문하기
            </button>
          </div>

          {/* Balance */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">잔고</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">주문 가능 금액</span>
                <span className="font-bold text-gray-900 transition-all">₩{balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">투자금액</span>
                <span className="font-semibold text-gray-700">₩{invested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-50 pt-3">
                <span className="text-sm text-gray-500">평가손익</span>
                <span className={`font-bold ${pnl >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {pnl >= 0 ? '+' : ''}₩{pnl.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Limits */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">리스크 한도</h2>
            <div className="space-y-4">
              {[
                { label: '일일 거래 한도', sub: '₩850,000 / ₩2,000,000 (42%)', pct: 42, color: 'bg-indigo-400' },
                { label: '단일 종목 비중', sub: 'SK하이닉스 18% (최대 20%)', pct: 90, color: 'bg-amber-400' },
                { label: '전체 손실 한도', sub: '-2.1% / -15% 기준 (양호)', pct: 14, color: 'bg-emerald-400' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{item.label}</span>
                    <span>{item.sub}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Trade History */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">체결 내역</h2>
            <span className="text-xs text-gray-400">{trades.length}건</span>
          </div>
          <div className="overflow-y-auto max-h-[560px]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs text-gray-400 border-b border-gray-50">
                  <th className="text-left pb-3 font-medium">시각</th>
                  <th className="text-left pb-3 font-medium">종목</th>
                  <th className="text-left pb-3 font-medium">유형</th>
                  <th className="text-right pb-3 font-medium">수량</th>
                  <th className="text-right pb-3 font-medium">체결가</th>
                  <th className="text-right pb-3 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((t, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 last:border-0"
                    style={{ animation: i === 0 && trades.length > INITIAL_TRADES.length ? 'fadeSlideIn 0.3s ease' : undefined }}
                  >
                    <td className="py-2.5 text-gray-400 text-xs">{t.time}</td>
                    <td className="py-2.5 font-medium text-gray-800">{t.stock}</td>
                    <td className="py-2.5">
                      <span className={`flex items-center gap-0.5 text-xs font-semibold ${t.type === 'buy' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {t.type === 'buy' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {t.type === 'buy' ? '매수' : '매도'}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-gray-600">{t.qty}</td>
                    <td className="py-2.5 text-right text-gray-600">{t.price}</td>
                    <td className="py-2.5 text-right">
                      <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">체결</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
