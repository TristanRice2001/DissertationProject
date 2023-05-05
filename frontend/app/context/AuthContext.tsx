import { createContext, ReactNode, useState } from "react";
import { User } from "types/user";

type Context = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setCurrentUser: (user: User) => void;
  unsetUser: () => void;
  user: User | null;
};

export const AuthContext = createContext<Context>({
  setIsAuthenticated() {},
  setCurrentUser() {},
  unsetUser() {},
  isAuthenticated: false,
  user: null,
});

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  /*
  This is a very small context, and all it will do is save a copy of the current user's 
  information, to keep track of information such as their username, challenges, and whether
  or not they are logged in
  */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const setCurrentUser = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const unsetUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        unsetUser,
        setIsAuthenticated,
        setCurrentUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
