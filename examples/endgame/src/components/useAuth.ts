import { useState, useEffect, useMemo, useCallback } from "react";

export function useAuth() {
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // read existing user token from cookie

    return () => {};
  });

  const login = useCallback(async (username: string) => {
    setUserName(userName);
    await delay();
    
    username === "mike"
      ? setUserToken("token:mike")
      : setUserToken("token:default");
    setIsAuthenticated(Boolean(userToken));

    return userToken;
  }, []);

  return useMemo(
    () => ({
      isAuthenticated,
      userToken,
      login,
    }),
    [userName, isAuthenticated, userToken, login]
  );
}

async function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}
