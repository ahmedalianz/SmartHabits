type AuthCallback = (user: { uid: string; email: string } | null) => void;

const mockUser = { uid: '123', email: 'test@test.com' };
let authCallback: AuthCallback;

export const getAuth = jest.fn(() => {});
export const onAuthStateChanged = jest.fn((_auth, cb) => {
  authCallback = cb;
  return jest.fn(); // Mock unsubscribe function
});
export const signOut = jest.fn(() => Promise.resolve());
export const signInWithEmailAndPassword = jest.fn(() =>
  Promise.resolve({ user: mockUser }),
);
export { authCallback, mockUser };
