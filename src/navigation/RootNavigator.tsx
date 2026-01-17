import useAppTheme from '@/hooks/useAppTheme';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AppStack from './app/AppStack';
import AuthStack from './auth/AuthStack';
import {
  useUser,
  useInitializeAuth,
  useAuthLoading,
} from '@/store/selectors/authSelectors';
import { useEffect } from 'react';

export default function RootNavigator() {
  const { name: themeName, colors } = useAppTheme();
  const navigationTheme = {
    ...(themeName === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(themeName === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };
  const user = useUser();
  const initializeAuth = useInitializeAuth();
  const isAuthLoading = useAuthLoading();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  if (isAuthLoading)
    return (
      <View
        testID="loading-screen"
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <>
      <StatusBar
        barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
