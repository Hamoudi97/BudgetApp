import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  // Email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Load users & logged-in user from localStorage (runs once)
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users"));
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (savedUsers) setUsers(savedUsers);
    if (savedUser) setUser(savedUser);
  }, []);

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

    // ✅ Save users to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

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

    // ✅ Save logged-in user to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(found));

    return { success: true };
  };

  // Logout user
  const logout = () => {
    setUser(null);

    // ❌ Remove logged-in user
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};