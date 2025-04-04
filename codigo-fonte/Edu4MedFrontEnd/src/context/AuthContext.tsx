import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

{/* 
interface Dream {
  id: string;
  text: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  dreams?: Dream[];
  phone?: string;
  location?: string;
  role: 'Admin' | 'User';
  createdAt: string;
  clickCount: number;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  updateUser: (data: Partial<User> | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'Admin' | 'User') => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  incrementClickCount: () => void;
  addDream: (text: string) => void;
  removeDream: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@edu4med.com',
    role: 'Admin',
    createdAt: '2024-01-01',
    clickCount: 150,
    location: 'SP',
    dreams: []
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@edu4med.com',
    role: 'User',
    createdAt: '2024-02-15',
    clickCount: 75,
    location: 'RJ',
    dreams: []
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const updateUser = (data: Partial<User> | null) => {
    setUser(prev => prev && data ? { ...prev, ...data } : data);
  };

  const incrementClickCount = () => {
    if (user) {
      const updatedUser = { ...user, clickCount: (user.clickCount || 0) + 1 };
      setUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const addDream = (text: string) => {
    if (user) {
      const newDream: Dream = {
        id: Date.now().toString(),
        text,
        createdAt: new Date().toISOString()
      };
      
      const updatedUser = {
        ...user,
        dreams: [...(user.dreams || []), newDream]
      };
      
      setUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
      toast.success('Sonho adicionado com sucesso!');
    }
  };

  const removeDream = (dreamId: string) => {
    if (user && user.dreams) {
      const updatedUser = {
        ...user,
        dreams: user.dreams.filter(dream => dream.id !== dreamId)
      };
      
      setUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
      toast.success('Sonho removido com sucesso!');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = users.find(u => u.email === email);
      if (!foundUser) {
        throw new Error('User not found');
      }

      setUser(foundUser);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: 'Admin' | 'User') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: String(users.length + 1),
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
        clickCount: 0,
        dreams: []
      };

      setUsers(prev => [...prev, newUser]);
      setUser(newUser);

      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.');
      throw error;
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({
          ...user,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);

      toast.success('Foto de perfil atualizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar foto de perfil. Tente novamente.');
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        users, 
        updateUser, 
        login, 
        register, 
        uploadProfileImage,
        incrementClickCount,
        addDream,
        removeDream
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

*/}

interface User {
  nome: string;
  email: string;
  password: string;
  role: 'Admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Recupera o usuário do localStorage, caso exista
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Salva o usuário no localStorage
    } else {
      localStorage.removeItem('user'); // Remove o usuário se estiver logado
    }
  }, [user]);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove o usuário ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};