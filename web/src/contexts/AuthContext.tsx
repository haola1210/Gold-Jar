import { createContext, type ReactNode, useState, useContext } from 'react';

interface User {
  name: string;
  email: string;
  id: string;
}

interface IAuthContextProps {
  children: ReactNode;
}

interface IAuthContext {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children }: IAuthContextProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
