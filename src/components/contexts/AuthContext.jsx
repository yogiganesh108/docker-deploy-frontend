import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔑 Simplified login → always succeed
  const login = (email, password) => {
    const mockUser = {
      id: 1,
      email,
      name: email.split("@")[0],
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true };
  };

  // 🔑 Simplified signup → always succeed
  const signup = (name, email, password) => {
    const mockUser = {
      id: 1,
      email,
      name,
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
