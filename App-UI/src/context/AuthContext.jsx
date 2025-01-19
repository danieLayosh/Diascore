import { createContext } from 'react';

// Create AuthContext with a default value
export const AuthContext = createContext({
  user: null,
  loading: true,
});
