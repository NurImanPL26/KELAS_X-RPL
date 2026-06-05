import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, LogIn, Shield, User } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    const role = login(email, password);
    if (role === 'admin') {
      navigate('/school');   // Admin langsung ke halaman web untuk edit
    } else {
      navigate('/school');   // Siswa ke halaman web (view only)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0f1c]">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/30 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/30 blur-[120px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl relative z-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.3)]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center"
          >
            <LogIn size={24} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-1">Selamat Datang</h2>
          <p className="text-gray-400 text-sm">Masuk ke portal SMKN 2 Buduran</p>
        </div>

        {/* Role hint */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
            <Shield size={16} className="text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-blue-300 font-medium">Admin</p>
            <p className="text-[10px] text-gray-500">Email berisi "admin"</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
            <User size={16} className="text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-purple-300 font-medium">Siswa</p>
            <p className="text-[10px] text-gray-500">Email lainnya</p>
          </div>
        </div>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-4 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </motion.p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
              placeholder="Masukkan email Anda"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
                placeholder="Masukkan password"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Masuk
          </motion.button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <p className="text-gray-400">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Daftar
            </Link>
          </p>
          <p className="text-gray-400">
            Lihat{' '}
            <Link to="/school" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Halaman Web Sekolah
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
