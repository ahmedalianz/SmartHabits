import { useAppStore } from '@/store';
import { act, renderHook } from '@testing-library/react-native';
import {
  authCallback,
  mockUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '../../../../__mocks__/@react-native-firebase/auth'; //absolute import will fail as it feels invisible to this file

describe('authSlice', () => {
  beforeEach(() => {
    act(() => useAppStore.setState({ user: null, isLoading: true }));
    jest.clearAllMocks();
  });
  it('loading should be true / user should be null before initialization', () => {
    const { result } = renderHook(() => useAppStore());
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.user).toBe(null);
  });
  it('should set user after initialization', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
      authCallback(mockUser);
    });
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.user).toBe(mockUser);
  });
  it('should create account when receive required props', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
    });
    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.createAccount(
        'test@example.com',
        'password123',
        'Test User',
      );
      errorMsg = response.errorMsg;
    });
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      'test@example.com',
      'password123',
    );
    expect(errorMsg).toBe('');
  });
  it('should handle registration with email in use', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
    });
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/email-already-in-use',
    });

    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.createAccount(
        'test@example.com',
        'password123',
        'Test User',
      );
      errorMsg = response.errorMsg;
    });
    expect(errorMsg).toBe('This email is already registered');
  });
  it('should handle registration with invalid email', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
    });
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/invalid-email',
    });
    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.createAccount(
        'test@example',
        'password123',
        'Test User',
      );
      errorMsg = response.errorMsg;
    });
    expect(errorMsg).toBe('Invalid email address');
  });
  it('should handle registration with weak password', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
    });
    createUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/weak-password',
    });
    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.createAccount(
        'test@example.com',
        'password',
        'Test User',
      );
      errorMsg = response.errorMsg;
    });
    expect(errorMsg).toBe('Password is too weak. Use at least 6 characters');
  });
  it('should handle unknown errors while creating account', async () => {
    const { result } = renderHook(() => useAppStore());

    createUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/unknown-error',
      message: 'Unknown error',
    });

    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.createAccount(
        'test@example.com',
        'password123',
        'Test User',
      );
      errorMsg = response.errorMsg;
    });

    expect(errorMsg).toBe('Registration failed. Please try again.');
  });
  it('should handle login', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
    });
    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.signIn(
        'test@example.com',
        'password',
      );
      errorMsg = response.errorMsg;
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      'test@example.com',
      'password',
    );
    expect(errorMsg).toBe('');
  });
  it('should handle login with invalid credentials', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
    });
    signInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/invalid-credential',
    });
    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.signIn(
        'test@example.com',
        'password',
      );
      errorMsg = response.errorMsg;
    });
    expect(errorMsg).toBe('Invalid credentials');
  });
  it('should handle login with network error', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
    });
    signInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/network-request-failed',
    });
    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.signIn(
        'test@example.com',
        'password',
      );
      errorMsg = response.errorMsg;
    });
    expect(errorMsg).toBe('Network error. Check your connection');
  });
  it('should handle unknown errors while logging in', async () => {
    const { result } = renderHook(() => useAppStore());

    signInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/unknown-error',
      message: 'Unknown error',
    });

    let errorMsg: string = '';
    await act(async () => {
      const response = await result.current.signIn(
        'test@example.com',
        'password123',
      );
      errorMsg = response.errorMsg;
    });

    expect(errorMsg).toBe('Login failed. Please try again.');
  });
  it('should sign out', async () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.initialize();
      authCallback(mockUser);
    });
    await act(async () => {
      await result.current.signOut();
      authCallback(null);
    });
    expect(signOut).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
  });
});

describe('Integration Tests', () => {
  it('should handle complete auth flow: register → login → logout', async () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.initialize();
    });

    await act(async () => {
      const response = await result.current.createAccount(
        'newuser@example.com',
        'password123',
        'New User',
      );
      expect(response.errorMsg).toBe('');
    });

    act(() => {
      authCallback(mockUser);
    });
    expect(result.current.user).toBe(mockUser);

    await act(async () => {
      await result.current.signOut();
    });
    expect(result.current.user).toBeNull();

    await act(async () => {
      const response = await result.current.signIn(
        'newuser@example.com',
        'password123',
      );
      expect(response.errorMsg).toBe('');
    });
  });
});
