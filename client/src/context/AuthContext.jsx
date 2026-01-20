import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          axios.defaults.headers.common["x-auth-token"] = token;
          const res = await axios.get(
            "https://taskmaster-intern-task.vercel.app/api/auth/user",
          );
          setUser(res.data);
        } catch (error) {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["x-auth-token"];
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      "https://taskmaster-intern-task.vercel.app/api/auth/login",
      {
        email,
        password,
      },
    );
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["x-auth-token"] = res.data.token;
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await axios.post(
      "https://taskmaster-intern-task.vercel.app/api/auth/register",
      {
        name,
        email,
        password,
      },
    );
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["x-auth-token"] = res.data.token;
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
