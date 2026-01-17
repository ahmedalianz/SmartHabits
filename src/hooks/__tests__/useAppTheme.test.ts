import { useColorScheme } from 'react-native';
import { useAppStore } from '@/store';
import { renderHook } from '@testing-library/react-native';
import useAppTheme from '../useAppTheme';

jest.mock('react-native/Libraries/Utilities//useColorScheme');

describe('useAppTheme', () => {
  beforeEach(() => {
    useAppStore.setState({ theme: 'light' });
  });
  it('should return light when user selects light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    useAppStore.setState({ theme: 'light' });
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.name).toBe('light');
    expect(result.current.colors.text).toBe('#111827');
  });
  it('should return dark when user selects dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    useAppStore.setState({ theme: 'dark' });
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.name).toBe('dark');
    expect(result.current.colors.text).toBe('#FFFFFF');
  });
  it('should return system color when user selects system', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    useAppStore.setState({ theme: 'system' });
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.name).toBe('dark');
    expect(result.current.colors.text).toBe('#FFFFFF');
  });
  it('should return light when system is unspecified', () => {
    (useColorScheme as jest.Mock).mockReturnValue(null);
    useAppStore.setState({ theme: 'system' });
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.name).toBe('light');
    expect(result.current.colors.text).toBe('#111827');
  });
});
