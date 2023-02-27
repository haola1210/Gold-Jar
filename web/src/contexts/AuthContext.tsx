import { createContext, type ReactNode, useState, useContext, useCallback } from 'react';

export interface User {
  name: string;
  email: string;
  _id: string;
  username: string;
}

interface IAuthContextProps {
  children: ReactNode;
}

interface IAuthContext {
  user: User | undefined;
  login?: (user: User) => void;
  logout?: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: undefined,
});

export const AuthContextProvider = ({ children }: IAuthContextProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = useCallback((user: User) => {
    console.log(user);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
