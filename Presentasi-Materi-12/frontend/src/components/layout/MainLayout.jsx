import { Outlet, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Bell, User, Shield, LayoutDashboard, Globe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function MainLayout() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const admin = isAdmin();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden bg-[#0a0f1c]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 px-6 py-4 flex items-center justify-between mx-4 mt-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"
          />
          <h1 className="text-xl font-bold tracking-wider text-white">
            SMKN 2 <span className="text-blue-400">Buduran</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Link ke halaman web sekolah */}
          <Link to="/school"
            className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            <Globe size={16} />
            <span className="hidden md:inline">Web Sekolah</span>
          </Link>

          <button className="text-gray-300 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center">
              {admin ? <Shield size={16} className="text-blue-400" /> : <User size={16} className="text-purple-400" />}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white leading-none">{user?.name || 'Pengguna'}</p>
              <p className="text-xs text-gray-500 mt-0.5 capitalize">{user?.role || 'guest'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors ml-2"
            >
              <LogOut size={15} />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 p-4 gap-1 mt-4">
          {admin ? (
            <>
              <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Admin Menu</p>
              <Link to="/admin/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                <LayoutDashboard size={16} />Dashboard Admin
              </Link>
              <Link to="/school"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                <Globe size={16} />Edit Web Sekolah
              </Link>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2">Menu Siswa</p>
              <Link to="/student/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                <LayoutDashboard size={16} />Dashboard
              </Link>
              <Link to="/school"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                <Globe size={16} />Web Sekolah
              </Link>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
