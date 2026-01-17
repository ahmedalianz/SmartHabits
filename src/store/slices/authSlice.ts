import {
  getAuth,
  onAuthStateChanged,
  signOut,
  FirebaseAuthTypes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { StateCreator } from 'zustand';
import { AppStore } from '..';

export type AuthState = {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  initialize: () => () => void;
  createAccount: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ errorMsg: string }>;
  signIn: (email: string, password: string) => Promise<{ errorMsg: string }>;
  signOut: () => Promise<void>;
};
const auth = getAuth();
export const createAuthSlice: StateCreator<
  AppStore,
  [['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  AuthState
> = set => ({
  user: null,
  isLoading: true,
  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      set({ user, isLoading: false });
    });
    return unsubscribe;
  },
  createAccount: async (email: string, password: string, name: string) => {
    let errorMsg = '';
    try {
      const userCreation = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await userCreation.user.updateProfile({ displayName: name });
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMsg = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMsg = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMsg = 'Registration is currently disabled';
          break;
        case 'auth/weak-password':
          errorMsg = 'Password is too weak. Use at least 6 characters';
          break;
        case 'auth/network-request-failed':
          errorMsg = 'Network error. Check your connection';
          break;
        default:
          errorMsg = 'Registration failed. Please try again.';
          break;
      }
    }
    return { errorMsg };
  },
  signIn: async (email: string, password: string) => {
    let errorMsg = '';
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error);

      switch (error.code) {
        case 'auth/invalid-credential':
          errorMsg = 'Invalid credentials';
          break;
        case 'auth/network-request-failed':
          errorMsg = 'Network error. Check your connection';
          break;
        default:
          errorMsg = 'Login failed. Please try again.';
          break;
      }
    }
    return { errorMsg };
  },
  signOut: async () => {
    await signOut(auth);
    set({ user: null, isLoading: false });
  },
});
