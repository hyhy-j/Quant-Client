import { type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-600">QuantAI</h1>
          <p className="text-sm text-gray-500 mt-1">회원가입</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: '이름', type: 'text', placeholder: '홍길동' },
            { label: '이메일', type: 'email', placeholder: 'example@email.com' },
            { label: '비밀번호', type: 'password', placeholder: '비밀번호 입력' },
            { label: '비밀번호 확인', type: 'password', placeholder: '비밀번호 재입력' },
          ].map(({ label, type, placeholder }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder={placeholder}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors mt-2 cursor-pointer"
          >
            가입하기
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline cursor-pointer">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
