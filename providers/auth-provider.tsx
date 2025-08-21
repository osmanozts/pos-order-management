import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/db/supabase";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error fetching user:", error);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    checkAuth();
    return () => authListener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, login, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
