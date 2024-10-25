import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { ActivityIndicator } from 'react-native';

import { supabase } from '~/utils/supabase';

const AuthContext = createContext({});

interface Props {
  children?: ReactNode;
}

interface AuthProps {
  isAuthenticated?: boolean;
  session: {
    user: {
      id: string;
      email: string;
    };
  };
}

const AuthProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }
  console.log('qqq ', session);
  return (
    <AuthContext.Provider
      value={{ session, user: session?.user, isAuthenticated: !!session?.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthProps => useContext(AuthContext);
