import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardStudent from './pages/student/DashboardStudent';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import MainLayout from './components/layout/MainLayout';
import SchoolWebsite from './pages/SchoolWebsite';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin()) return <Navigate to="/school" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root → halaman web sekolah */}
        <Route path="/" element={<Navigate to="/school" replace />} />

        {/* Halaman Web Sekolah (publik + admin edit) */}
        <Route path="/school" element={<SchoolWebsite />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route element={<MainLayout />}>
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <DashboardStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/school" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
