import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock auth — cek jika email mengandung "admin"
    if (email.toLowerCase().includes('admin')) {
      setUser({ name: 'Administrator', email, role: 'admin' });
      return 'admin';
    } else {
      setUser({ name: 'Siswa', email, role: 'siswa' });
      return 'siswa';
    }
  };

  const logout = () => setUser(null);

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
