import { createContext } from "react";

type Props = {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
  login: (uid: string, token: string, expirationDate?: Date) => void;
  logout: () => void;
};

export const AuthContext = createContext<Props>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (uid, token, expirationDate) => {},
  logout: () => {}
});
