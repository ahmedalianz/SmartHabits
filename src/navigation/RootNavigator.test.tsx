import React from 'react';
import { render } from '@testing-library/react-native';
import useAppTheme from '@/hooks/useAppTheme';
import RootNavigator from '@/navigation/RootNavigator';
import {
  useUser,
  useInitializeAuth,
  useAuthLoading,
} from '@/store/selectors/authSelectors';
import { mockUser } from '../../__mocks__/@react-native-firebase/auth';

jest.mock('@/hooks/useAppTheme');
jest.mock('@/store/selectors/authSelectors', () => ({
  useUser: jest.fn(),
  useInitializeAuth: jest.fn(() => jest.fn()),
  useAuthLoading: jest.fn(),
}));
const lightThemeMock = {
  name: 'light',
  colors: {
    primary: '#000',
    background: '#111',
    card: '#222',
    text: '#fff',
    border: '#333',
  },
};
const darkThemeMock = {
  name: 'dark',
  colors: {
    primary: '#000',
    background: '#111',
    card: '#222',
    text: '#fff',
    border: '#333',
  },
};
describe('RootNavigator', () => {
  it('renders Loading Screen when auth is loading', () => {
    (useAppTheme as jest.Mock).mockReturnValue(lightThemeMock);
    (useAuthLoading as jest.Mock).mockReturnValue(true);
    (useInitializeAuth as jest.Mock).mockReturnValue(() => jest.fn());
    const { getByTestId } = render(<RootNavigator />);
    expect(getByTestId('loading-screen')).toBeTruthy();
  });
  it('should render auth stack when not authenticated', () => {
    (useAppTheme as jest.Mock).mockReturnValue(lightThemeMock);
    (useAuthLoading as jest.Mock).mockReturnValue(false);
    (useInitializeAuth as jest.Mock).mockReturnValue(() => jest.fn());
    const { getByTestId } = render(<RootNavigator />);
    expect(getByTestId('navigation-container')).toBeTruthy();
    expect(getByTestId('screen-Login')).toBeTruthy();
    expect(getByTestId('screen-Register')).toBeTruthy();
  });
  it('should render app stack when authenticated', () => {
    (useAppTheme as jest.Mock).mockReturnValue(lightThemeMock);
    (useAuthLoading as jest.Mock).mockReturnValue(false);
    (useUser as jest.Mock).mockReturnValue(mockUser);
    (useInitializeAuth as jest.Mock).mockReturnValue(() => jest.fn());
    const { getByTestId } = render(<RootNavigator />);
    expect(getByTestId('navigation-container')).toBeTruthy();
    expect(getByTestId('Tab-HabitsStack')).toBeTruthy();
    expect(getByTestId('Tab-SettingsStack')).toBeTruthy();
  });
  it('uses dark theme and light-content status bar', () => {
    (useAppTheme as jest.Mock).mockReturnValue(darkThemeMock);

    const { getByTestId } = render(<RootNavigator />);

    expect(getByTestId('navigation-container')).toBeTruthy();
    expect(getByTestId('Tab-HabitsStack')).toBeTruthy();
    expect(getByTestId('Tab-SettingsStack')).toBeTruthy();
  });

  it('uses light theme', () => {
    (useAppTheme as jest.Mock).mockReturnValue(lightThemeMock);

    const { getByTestId } = render(<RootNavigator />);
    expect(getByTestId('navigation-container')).toBeTruthy();
    expect(getByTestId('Tab-HabitsStack')).toBeTruthy();
    expect(getByTestId('Tab-SettingsStack')).toBeTruthy();
  });
});
