import { type ReactNode } from 'react';
import { Bell } from 'lucide-react';
import Sidebar from './Sidebar';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function DashboardLayout({ title, subtitle, children }: Props) {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{today}</span>
            <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>
          </div>
        </header>
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
