import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/axios"; // axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] =
        `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { accessToken, user } = res.data;
      console.log(accessToken);
      // lưu local
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // set state
      setToken(accessToken);
      setUser(user);



    } catch (err) {
      return false;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);

    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
