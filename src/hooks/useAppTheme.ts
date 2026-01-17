import { useColorScheme } from 'react-native';
import { theme, ThemeMode } from '@/theme';
import { useTheme } from '@/store/selectors/themeSelectors';

const resolveThemeMode = (
  userTheme: ThemeMode,
  systemTheme: 'light' | 'dark' | 'unspecified' | null,
): 'light' | 'dark' => {
  if (userTheme === 'system') {
    if (systemTheme === 'unspecified' || !systemTheme) return 'light';
    return systemTheme;
  }
  return userTheme;
};

const useAppTheme = () => {
  const systemTheme = useColorScheme();
  const userTheme = useTheme();

  const resolvedTheme = resolveThemeMode(userTheme, systemTheme);

  return {
    name: resolvedTheme,
    colors: theme[resolvedTheme],
  };
};

export default useAppTheme;
