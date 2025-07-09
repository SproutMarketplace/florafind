'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only subscribe if auth object is valid (i.e., Firebase is configured)
    if (auth && Object.keys(auth).length > 0) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // If Firebase is not configured, stop loading and set user to null.
      setLoading(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  const AuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div>Loading...</div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
  AuthComponent.displayName = `WithAuth(${Component.displayName || Component.name || 'Component'})`;
  return AuthComponent;
}