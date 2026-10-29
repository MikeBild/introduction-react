import { useState, useEffect, useMemo, useCallback } from "react";

export function useAuth() {
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // read existing user token from cookie

    return () => {
      // cleanup resources!!!
    };
  });

  const login = useCallback(
    async (username: string) => {
      const userToken = await delay(username === "mike" ? "token:mike" : "");
      setUserToken(userToken);
      setIsAuthenticated(Boolean(userToken));
      setUserName(username);      
    },
    [userToken, userName]
  );

  const logout = useCallback(async () => {
    const userToken = await delay("");
    setUserToken(userToken);
    setIsAuthenticated(Boolean(userToken));
    setUserName("");
    return userToken;
  }, [userToken, userName]);

  return useMemo(
    () => ({
      userName,
      isAuthenticated,
      userToken,
      login,
      logout,
    }),
    [userName, isAuthenticated, userToken, login, logout]
  );
}

async function delay(userToken: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userToken);
    }, 1000);
  });
}
