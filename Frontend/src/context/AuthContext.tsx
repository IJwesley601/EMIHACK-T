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
  hasRole: (role: string) => boolean;
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

const login = async (email: string) => {
  try {
    setLoading(true);

    const response = await axios.post("http://localhost:3000/api/auth/login", { email });

    const { user, token } = response.data;

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  } catch (error: any) {
    console.error("Erreur de connexion :", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?")
    if(confirmation){
      setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    } else{
      return 
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        hasRole,
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