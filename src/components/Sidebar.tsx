import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PieChart, TrendingUp, FileText, Settings, LogOut } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { to: '/portfolio', icon: PieChart, label: '포트폴리오' },
  { to: '/trading', icon: TrendingUp, label: '매매' },
  { to: '/reports', icon: FileText, label: '리포트' },
  { to: '/settings', icon: Settings, label: '설정' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-100 flex flex-col z-10">
      <div className="px-6 py-6 border-b border-gray-100">
        <span className="text-xl font-bold text-indigo-600">QuantAI</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
            이
          </div>
          <span className="text-sm font-medium text-gray-700">이현정</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
