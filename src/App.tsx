import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/splash/SplashPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import PortfolioPage from './pages/portfolio/PortfolioPage';
import TradingPage from './pages/trading/TradingPage';
import ReportsPage from './pages/reports/ReportsPage';
import SettingsPage from './pages/settings/SettingsPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/portfolio" element={<PrivateRoute><PortfolioPage /></PrivateRoute>} />
        <Route path="/trading" element={<PrivateRoute><TradingPage /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
