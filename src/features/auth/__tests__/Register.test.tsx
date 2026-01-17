import { useCreateAccount } from '@/store/selectors/authSelectors';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Register from '../Register';

jest.mock('@/store/selectors/authSelectors');

describe('Register', () => {
  const mockCreateAccount = jest.fn();
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    (useCreateAccount as jest.Mock).mockReturnValue(mockCreateAccount);
    mockCreateAccount.mockResolvedValue({ errorMsg: '' });
  });

  describe('Rendering', () => {
    it('Should render all form elements', () => {
      const { getByTestId } = render(
        <Register navigation={mockNavigation as any} route={{} as any} />,
      );
      expect(getByTestId('register-name')).toBeTruthy();
      expect(getByTestId('register-email')).toBeTruthy();
      expect(getByTestId('register-password')).toBeTruthy();
      expect(getByTestId('register-confirm-password')).toBeTruthy();
      expect(getByTestId('register-button')).toBeTruthy();
      expect(getByTestId('register-link')).toBeTruthy();
    });
  });

  describe('validation', () => {
    it('Should show errors of required fields when submitted empty', async () => {
      const { getByTestId } = render(
        <Register navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.press(getByTestId('register-button'));
      await waitFor(() => {
        expect(getByTestId('register-name-error')).toBeTruthy();
        expect(getByTestId('register-email-error')).toBeTruthy();
        expect(getByTestId('register-password-error')).toBeTruthy();
        expect(getByTestId('register-confirm-password-error')).toBeTruthy();
      });
    });

    it('Should call the submit function when all required are entered', async () => {
      const { getByTestId } = render(
        <Register navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.changeText(getByTestId('register-name'), 'name');
      fireEvent.changeText(getByTestId('register-email'), 'email@e.com');
      fireEvent.changeText(getByTestId('register-password'), 'password');
      fireEvent.changeText(
        getByTestId('register-confirm-password'),
        'password',
      );
      fireEvent.press(getByTestId('register-button'));
      await waitFor(() => {
        expect(mockCreateAccount).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation', () => {
    it('Should go To Login screen when press on the link', () => {
      const { getByTestId } = render(
        <Register navigation={mockNavigation as any} route={{} as any} />,
      );
      fireEvent.press(getByTestId('register-link'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });
  });
});
