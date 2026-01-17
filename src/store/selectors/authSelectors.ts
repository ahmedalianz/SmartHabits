import { useAppStore } from '../index';

export const useUser = () => useAppStore(state => state.user);

export const useAuthLoading = () => useAppStore(state => state.isLoading);

export const useInitializeAuth = () => useAppStore(state => state.initialize);
export const useCreateAccount = () => useAppStore(state => state.createAccount);
export const useSignIn = () => useAppStore(state => state.signIn);

export const useSignOut = () => useAppStore(state => state.signOut);

export const useAuth = () =>
  useAppStore(state => ({
    user: state.user,
    isLoading: state.isLoading,
    signOut: state.signOut,
  }));
