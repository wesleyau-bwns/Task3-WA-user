import { createContext, useContext, useState } from "react";
import { getAuthenticatedUser, getPermissions } from "../api/endpoints/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getAuthenticatedUser();
      const user = response.data.user || null;
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await getPermissions();
      const perms = response.data.permissions || [];
      setPermissions(perms);
    } catch (err) {
      setPermissions([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        permissions,
        loading,
        setUser,
        fetchUser,
        fetchPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
