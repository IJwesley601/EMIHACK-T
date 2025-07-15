import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'analyst';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Création d'un utilisateur factice sans vérification
      const mockUser: User = {
        _id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0] || 'Utilisateur',
        email: email,
        role: 'admin' // Par défaut on met admin, mais vous pouvez adapter
      };

      // Stockage du mock user
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Optionnel: stocker un token factice
      localStorage.setItem('token', 'mock-token-' + Math.random().toString(36).substr(2, 16));
      
    } catch (error) {
      console.error("Login simulation error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};