import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    // fade in → hold → fade out → navigate
    const t1 = setTimeout(() => setPhase('hold'), 800);
    const t2 = setTimeout(() => setPhase('out'), 4000);
    const t3 = setTimeout(() => navigate('/login'), 4700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #EDE9FE 100%)',
        transition: 'opacity 0.7s ease',
        opacity: phase === 'out' ? 0 : 1,
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'translateY(12px)' : 'translateY(0)',
        }}
        className="flex flex-col items-center gap-5"
      >
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M5 26L12 16L18 22L25 10L29 15" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="29" cy="15" r="2.5" fill="white"/>
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 tracking-tight">QuantAI</h1>
          <p className="text-gray-500 mt-2 text-base">AI가 대신 분석하고, 당신은 수익에 집중하세요</p>
        </div>

        <div className="flex items-center gap-6 mt-2">
          {['모멘텀 전략', 'AI 리포트', '맞춤 포트폴리오'].map((tag) => (
            <span
              key={tag}
              className="text-xs text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Loading dots */}
      <div
        style={{
          transition: 'opacity 0.6s ease 0.4s',
          opacity: phase === 'in' ? 0 : 1,
        }}
        className="flex gap-1.5 mt-4"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
