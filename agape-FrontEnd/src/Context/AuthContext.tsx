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

  const { setId, setUserName, setName, setLastName, setEmail, setProfilePic } = useUser();


  useEffect(() => {
  let mounted = true;
  const tryRefresh = async () => {
    try {
      const res = await fetch('/auth/refresh', {
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
        setId(body.user.id ?? body.user.id_Usuario ?? 0);
        setUserName(body.user.nombreUsuario ?? body.user.nombreUsuario);
        setName(body.user.nombre ?? '');
        setLastName(body.user.apellido ?? '');
        setEmail(body.user.email ?? '');
        if (body.user.picture) setProfilePic(body.user.picture);
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
      await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      setAccessToken(null);
      // limpiar user context
      setId(0);
      setUserName('Invitado');
      setName('');
      setLastName('');
      setEmail('');
      if (setProfilePic) setProfilePic(null);
    }
  };

  // authedFetch: añade Authorization y si 401 intenta refresh una vez
  const authedFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    const hdrs = new Headers(init.headers as HeadersInit || {});
    if (accessToken) hdrs.set('Authorization', `Bearer ${accessToken}`);

    let res = await fetch(input, { ...init, headers: hdrs, credentials: 'include' });
    if (res.status === 401) {
      // intentar refresh
      const r = await fetch('/auth/refresh', { method: 'POST', credentials: 'include' });
      if (r.ok) {
        const body = await r.json();
        if (body.access_token) {
          setAccessToken(body.access_token);
          hdrs.set('Authorization', `Bearer ${body.access_token}`);
          res = await fetch(input, { ...init, headers: hdrs, credentials: 'include' });
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
