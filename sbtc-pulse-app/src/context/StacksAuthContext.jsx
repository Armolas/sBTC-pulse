'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

// Create context
const StacksAuthContext = createContext(undefined);

// Create a client-side only provider
export const StacksAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSession, setUserSession] = useState(null);

  // Initialize user session on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const appConfig = new AppConfig(['store_write', 'publish_data']);
      const session = new UserSession({ appConfig });
      setUserSession(session);
      
      if (session.isUserSignedIn()) {
        setUserData(session.loadUserData());
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Authentication function
  const authenticate = () => {
    if (!userSession) return Promise.reject('User session not initialized');
    
    return new Promise((resolve, reject) => {
      showConnect({
        appDetails: {
          name: 'sBTC Pulse',
          icon: window.location.origin + '/logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          const userData = userSession.loadUserData();
          setUserData(userData);
          setIsAuthenticated(true);
          resolve(userData);
        },
        onCancel: () => {
          reject(new Error('User cancelled authentication'));
        },
        userSession,
      });
    });
  };

  // Logout function
  const logout = () => {
    if (userSession) {
      userSession.signUserOut();
      setUserData(null);
      setIsAuthenticated(false);
    }
  };

  // Don't render anything on the server
  if (typeof window === 'undefined' || !userSession) {
    return <>{children}</>;
  }

  return (
    <StacksAuthContext.Provider
      value={{
        userData,
        isAuthenticated,
        authenticate,
        logout,
        userSession,
      }}
    >
      {children}
    </StacksAuthContext.Provider>
  );
};

// Hook to use the auth context
export const useStacksAuth = () => {
  const context = useContext(StacksAuthContext);
  if (context === undefined) {
    throw new Error('useStacksAuth must be used within a StacksAuthProvider');
  }
  return context;
};

// Export a singleton userSession for use outside of React components
export let userSession = null;
if (typeof window !== 'undefined') {
  const appConfig = new AppConfig(['store_write', 'publish_data']);
  userSession = new UserSession({ appConfig });
}
