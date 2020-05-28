import { createContext } from "react";

type Props = {
  isLoggedIn: boolean;
  userId: string | null;
  login: (uid: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<Props>({
  isLoggedIn: false,
  userId: null,
  login: (uid: string) => {},
  logout: () => {}
});
