/* eslint-disable react-native/no-unused-styles */
import { AppButton, AppInput, AppText } from '@/components';
import useAppTheme from '@/hooks/useAppTheme';
import { useSignIn } from '@/store/selectors/authSelectors';
import { Colors } from '@/theme/colors';
import { AuthStackScreenProps } from '@/types/navigation';
import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LoginSchema } from './utils/validation';
type LoginProps = AuthStackScreenProps<'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const signIn = useSignIn();
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [errorMessage, setErrorMessage] = useState('');

  const goToRegister = () => {
    navigation.navigate('Register');
  };
  const handleLogin = async (values: { email: string; password: string }) => {
    const { errorMsg } = await signIn(values.email, values.password);
    errorMsg && setErrorMessage(errorMsg);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLogin}
          validationSchema={LoginSchema}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            errors,
            values,
            touched,
            isValid,
          }) => (
            <>
              <AppInput
                label="Email"
                placeholder="john@example.com"
                error={errors.email}
                touched={touched.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                editable={!isSubmitting}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                testID="login-email"
              />
              <AppInput
                label="Password"
                placeholder="******"
                error={errors.password}
                touched={touched.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secure
                editable={!isSubmitting}
                autoComplete="password"
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="done"
                testID="login-password"
              />
              {errorMessage && (
                <AppText style={styles.errorText}>{errorMessage}</AppText>
              )}
              <AppButton
                title="Login"
                testID="login-button"
                onPress={handleSubmit}
                disabled={isSubmitting || !isValid}
              />
            </>
          )}
        </Formik>
        <AppText style={styles.link} onPress={goToRegister} testID="login-link">
          Don't have an account? Register
        </AppText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      justifyContent: 'center',
      padding: 24,
    },
    link: {
      marginTop: 20,
      textAlign: 'center',
      color: colors.link,
    },
    errorText: {
      color: colors.danger,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
  });
