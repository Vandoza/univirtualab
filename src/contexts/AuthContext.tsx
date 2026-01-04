import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getItem, setItem } from "@/services/storage";

type AuthUser = {
  uid: string;
  email: string;
};

type StoredUser = {
  uid: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "univirtualab_users_v1";
const CURRENT_USER_KEY = "univirtualab_current_user_v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const raw = await getItem(CURRENT_USER_KEY);
        if (raw && raw.trim().length > 0) {
          const parsed = JSON.parse(raw) as AuthUser;
          if (parsed && parsed.email && parsed.uid) {
            setUser(parsed);
          }
        }
      } catch (e) {
        console.log("Auth init error", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const signIn = async (email: string, password: string) => {
    const raw = (await getItem(USERS_KEY)) ?? "[]";
    let arr: StoredUser[];
    try {
      arr = JSON.parse(raw) as StoredUser[];
      if (!Array.isArray(arr)) arr = [];
    } catch {
      arr = [];
    }
    const found = arr.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );
    if (!found) {
      throw new Error("Email atau password salah.");
    }
    const authUser: AuthUser = { uid: found.uid, email: found.email };
    await setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const signUp = async (email: string, password: string) => {
    const raw = (await getItem(USERS_KEY)) ?? "[]";
    let arr: StoredUser[];
    try {
      arr = JSON.parse(raw) as StoredUser[];
      if (!Array.isArray(arr)) arr = [];
    } catch {
      arr = [];
    }
    const exists = arr.some(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) {
      throw new Error("Email sudah terdaftar.");
    }
    const uid = `user_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    const stored: StoredUser = { uid, email, password };
    arr.push(stored);
    await setItem(USERS_KEY, JSON.stringify(arr));
    const authUser: AuthUser = { uid, email };
    await setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const clearCurrentUser = async () => {
    await setItem(CURRENT_USER_KEY, "");
    setUser(null);
  };

  const signOut = async () => {
    await clearCurrentUser();
  };

  const logout = async () => {
    await clearCurrentUser();
  };

  const value: AuthContextValue = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
