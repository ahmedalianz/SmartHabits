import { useSignIn } from '@/store/selectors/authSelectors';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Login from '../Login';

jest.mock('@/store/selectors/authSelectors');

describe('Login', () => {
  const mockSignIn = jest.fn();
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    (useSignIn as jest.Mock).mockReturnValue(mockSignIn);
    mockSignIn.mockResolvedValue({ errorMsg: '' });
  });

  describe('Rendering', () => {
    it('Should render all form elements', () => {
      const { getByTestId } = render(
        <Login navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByTestId('login-email')).toBeTruthy();
      expect(getByTestId('login-password')).toBeTruthy();
      expect(getByTestId('login-button')).toBeTruthy();
      expect(getByTestId('login-link')).toBeTruthy();
    });
  });

  describe('validation', () => {
    it('Should show errors of required fields when submitted empty', async () => {
      const { getByTestId } = render(
        <Login navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.press(getByTestId('login-button'));
      await waitFor(() => {
        expect(getByTestId('login-email-error')).toBeTruthy();
        expect(getByTestId('login-password-error')).toBeTruthy();
      });
    });
    it('Should show error of required email when submitted empty email', async () => {
      const { getByTestId } = render(
        <Login navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.changeText(getByTestId('login-password'), 'password');
      fireEvent.press(getByTestId('login-button'));
      await waitFor(() => {
        expect(getByTestId('login-email-error')).toBeTruthy();
      });
    });
    it('Should show error of required password when submitted empty password', async () => {
      const { getByTestId } = render(
        <Login navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.changeText(getByTestId('login-email'), 'email');
      fireEvent.press(getByTestId('login-button'));
      await waitFor(() => {
        expect(getByTestId('login-password-error')).toBeTruthy();
        expect(mockSignIn).not.toHaveBeenCalled();
      });
    });
    it('Should call the submit function when email & password are entered', async () => {
      const { getByTestId } = render(
        <Login navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.changeText(getByTestId('login-email'), 'email@e.com');
      fireEvent.changeText(getByTestId('login-password'), 'password');
      fireEvent.press(getByTestId('login-button'));
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation', () => {
    it('Should go To Register screen when press on the link', () => {
      const { getByTestId } = render(
        <Login navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.press(getByTestId('login-link'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
    });
  });
});
