import { createContext, useContext, useState } from "react";

const Context = createContext<[{ username: string; token: string }, Function]>([
  { username: "", token: "" },
  () => null,
]);

export function UserProvider({ children, username = "" }) {
  const [user, setUser] = useState({ username, token: "" });
  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
