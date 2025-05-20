'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { connect, disconnect, getLocalStorage } from '@stacks/connect';
import { getCurrentAddress } from '../services/stacksService';

const StacksAuthContext = createContext(null);

export const useStacksAuth = () => {
  const context = useContext(StacksAuthContext);
  if (!context) {
    throw new Error('useStacksAuth must be used within a StacksAuthProvider');
  }
  return context;
};

// Create a client-side only provider
export const StacksAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user session on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = getLocalStorage();
      if (storage && storage.addresses && storage.addresses.stx && storage.addresses.stx.length > 0) {
        setUserData({
          profile: {
            stxAddress: {
              mainnet: storage.addresses.stx[0].address,
              testnet: storage.addresses.stx[0].address
            }
          }
        });
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, []);

  const authenticate = async () => {
    try {
      setIsLoading(true);
      const response = await connect();
      
      if (response) {
        const storage = getLocalStorage();
        if (storage && storage.addresses && storage.addresses.stx && storage.addresses.stx.length > 0) {
          setUserData({
            profile: {
              stxAddress: {
                mainnet: storage.addresses.stx[0].address,
                testnet: storage.addresses.stx[0].address
              }
            }
          });
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Failed to authenticate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    disconnect();
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <StacksAuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        authenticate,
        logout,
        isLoading
      }}
    >
      {children}
    </StacksAuthContext.Provider>
  );
};

export default StacksAuthContext;
