import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';

type AuthContextValue = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
  loading: boolean;
  logout: () => Promise<void>;
  authedFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { setId, setUserName, setName, setLastName, setEmail } = useUser();


  useEffect(() => {
  let mounted = true;
  const tryRefresh = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (!mounted) return;
      if (!res.ok) {
        setAccessToken(null);
        setLoading(false);
        return;
      }

      const body = await res.json(); // { access_token, user }
      if (body.access_token) setAccessToken(body.access_token);

      // POBLAR USER CONTEXT
      if (body.user) {
        setId(body.user.id);
        setUserName(body.user.nombreUsuario);
        setName(body.user.nombre);
        setLastName(body.user.apellido);
        setEmail(body.user.email);
      }
    } catch (err) {
      console.error('refresh failed', err);
      setAccessToken(null);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  tryRefresh();
  return () => { mounted = false; };
}, []);

  const logout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      setAccessToken(null);
    }
  };

  // authedFetch: añade Authorization y si 401 intenta refresh una vez
  const authedFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    const headers: Record<string, string> = { ...(init.headers as any || {}) };
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

    let res = await fetch(input, { ...init, headers, credentials: 'include' });
    if (res.status === 401) {
      // intentar refresh
      const r = await fetch('http://localhost:3000/auth/refresh', { method: 'POST', credentials: 'include' });
      if (r.ok) {
        const body = await r.json();
        if (body.access_token) {
          setAccessToken(body.access_token);
          headers['Authorization'] = `Bearer ${body.access_token}`;
          res = await fetch(input, { ...init, headers, credentials: 'include' });
        }
      }
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading, logout, authedFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
