import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    title: '투자 목표',
    question: '어떤 목표로 투자하시나요?',
    type: 'card' as const,
    options: [
      { label: '자산 성장', desc: '장기 수익 극대화' },
      { label: '안정적 수익', desc: '리스크 최소화' },
      { label: '단기 수익', desc: '적극적 트레이딩' },
    ],
  },
  {
    title: '리스크 허용도',
    question: '손실이 발생할 경우 어느 정도까지 감당할 수 있나요?',
    type: 'slider' as const,
    options: [],
  },
  {
    title: '투자 기간',
    question: '얼마나 오래 투자하실 계획인가요?',
    type: 'card' as const,
    options: [
      { label: '1년 미만', desc: '단기 투자' },
      { label: '1~3년', desc: '중기 투자' },
      { label: '3년 이상', desc: '장기 투자' },
    ],
  },
  {
    title: '월 투자 가능 금액',
    question: '월 투자 가능 금액은 얼마인가요?',
    type: 'card' as const,
    options: [
      { label: '50만원 미만', desc: '소액 투자' },
      { label: '50~200만원', desc: '중액 투자' },
      { label: '200만원 이상', desc: '고액 투자' },
    ],
  },
  {
    title: '초기 투자금',
    question: 'QuantAI에 처음 투자할 금액을 입력해주세요.',
    type: 'amount' as const,
    options: [],
  },
];

const sliderLabels: Record<number, string> = {
  1: '손실을 거의 못 견딤',
  2: '작은 손실은 감수 가능',
  3: '어느 정도 감수 가능',
  4: '상당한 손실도 감수',
  5: '큰 손실도 감수 가능',
};

const QUICK_AMOUNTS = [1000000, 3000000, 5000000, 10000000];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<(string | number | null)[]>([null, 3, null, null, null]);
  const [amountInput, setAmountInput] = useState('');
  const [done, setDone] = useState(false);

  const current = steps[step];

  const canProceed = () => {
    if (current.type === 'card') return !!selected[step];
    if (current.type === 'amount') return amountInput !== '' && Number(amountInput.replace(/,/g, '')) > 0;
    return true;
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      const amount = Number(amountInput.replace(/,/g, ''));
      localStorage.setItem('initialInvestment', String(amount));
      setDone(true);
    }
  };

  const formatAmount = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    return num ? Number(num).toLocaleString() : '';
  };

  if (done) {
    const amount = Number(amountInput.replace(/,/g, ''));
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 w-full max-w-md text-center">
          <CheckCircle className="mx-auto text-indigo-600 mb-4" size={52} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">분석 완료</h2>
          <div className="inline-block bg-indigo-50 text-indigo-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            중립형 투자자
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-3">
            안정성과 성장성의 균형을 추구하는 투자자입니다. 모멘텀 전략 기반으로 맞춤 포트폴리오를 구성해 드렸습니다.
          </p>
          <p className="text-indigo-600 font-semibold text-sm mb-8">
            초기 투자금 ₩{amount.toLocaleString()}이 설정되었습니다.
          </p>
          <button
            onClick={() => {
              localStorage.setItem('isLoggedIn', 'true');
              navigate('/dashboard');
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            대시보드 시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                  i < step
                    ? 'bg-indigo-600 text-white'
                    : i === step
                    ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-400'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < step ? 'bg-indigo-400' : 'bg-gray-100'}`} />
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide mb-2">
          {current.title}
        </p>
        <h2 className="text-lg font-bold text-gray-900 mb-6">{current.question}</h2>

        {current.type === 'card' && (
          <div className="space-y-3">
            {current.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  const next = [...selected];
                  next[step] = opt.label;
                  setSelected(next);
                }}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selected[step] === opt.label
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <span className="font-semibold text-gray-800">{opt.label}</span>
                <span className="text-sm text-gray-500 ml-2">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}

        {current.type === 'slider' && (
          <div>
            <input
              type="range"
              min={1}
              max={5}
              value={selected[step] as number}
              onChange={(e) => {
                const next = [...selected];
                next[step] = Number(e.target.value);
                setSelected(next);
              }}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            </div>
            <p className="text-center text-sm font-medium text-indigo-600 mt-3">
              {sliderLabels[selected[step] as number]}
            </p>
          </div>
        )}

        {current.type === 'amount' && (
          <div>
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₩</span>
              <input
                type="text"
                inputMode="numeric"
                value={amountInput}
                onChange={(e) => setAmountInput(formatAmount(e.target.value))}
                placeholder="0"
                className="w-full border-2 border-gray-200 rounded-xl pl-8 pr-4 py-3 text-lg font-semibold focus:outline-none focus:border-indigo-400 text-right"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmountInput(amt.toLocaleString())}
                  className="border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  ₩{amt.toLocaleString()}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              이 금액을 기준으로 포트폴리오와 수익률이 계산됩니다.
            </p>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {step < steps.length - 1 ? '다음' : '완료'}
        </button>
      </div>
    </div>
  );
}
