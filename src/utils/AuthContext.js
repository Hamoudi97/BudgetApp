import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  // Email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  //empty state
  useEffect(() => {}, []);

  // Register user
  const register = (email, password) => {
    if (!isValidEmail(email)) {
      return { success: false, error: "Invalid email format" };
    }

    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { success: false, error: "Email already in use" };
    }

    const newUser = { email, password };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    //the state persists in mememory during the app session

    return { success: true };
  };

  // Login user
  const login = (email, password) => {
    if (!isValidEmail(email)) {
      return { success: false, error: "Invalid email format" };
    }

    const found = users.find((u) => u.email === email);

    if (!found) {
      return { success: false, error: "User not found" };
    }

    if (found.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    setUser(found);

    return { success: true };
  };

  // Logout user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
