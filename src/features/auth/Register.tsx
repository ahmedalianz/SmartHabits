/* eslint-disable react-native/no-unused-styles */
import { AppButton, AppInput, AppText } from '@/components';
import { AuthStackScreenProps } from '@/types/navigation';
import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { RegisterSchema } from './utils/validation';
import useAppTheme from '@/hooks/useAppTheme';
import { Colors } from '@/theme/colors';
import { useCreateAccount } from '@/store/selectors/authSelectors';
type RegisterProps = AuthStackScreenProps<'Register'>;

const Register = ({ navigation }: RegisterProps) => {
  const createAccount = useCreateAccount();
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [errorMessage, setErrorMessage] = useState('');
  const handleRegister = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { errorMsg } = await createAccount(
      values.email,
      values.password,
      values.name,
    );
    errorMsg && setErrorMessage(errorMsg);
  };
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={styles.title}>Create Account</AppText>
        <AppText style={styles.subtitle}>
          Sign up to start building better habits
        </AppText>
        <Formik
          onSubmit={handleRegister}
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            isValid,
          }) => (
            <>
              <AppInput
                label="Full Name"
                placeholder="John Doe"
                error={errors.name}
                touched={touched.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                editable={!isSubmitting}
                autoCapitalize="words"
                autoComplete="name"
                textContentType="name"
                testID="register-name"
              />
              <AppInput
                label="Email"
                placeholder="john@example.com"
                error={errors.email}
                touched={touched.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                editable={!isSubmitting}
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                testID="register-email"
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
                autoComplete="password-new"
                textContentType="newPassword"
                autoCapitalize="none"
                autoCorrect={false}
                testID="register-password"
              />
              <AppInput
                label="Confirm Password"
                placeholder="******"
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secure
                editable={!isSubmitting}
                autoComplete="password-new"
                textContentType="newPassword"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="done"
                testID="register-confirm-password"
              />
              {errorMessage && (
                <AppText testID="register-error" style={styles.errorText}>
                  {errorMessage}
                </AppText>
              )}
              <AppButton
                title={isSubmitting ? 'Creating...' : 'Sign Up'}
                onPress={handleSubmit}
                disabled={isSubmitting || !isValid}
                testID="register-button"
              />
            </>
          )}
        </Formik>
        <AppText style={styles.link} onPress={goToLogin} testID="register-link">
          Already have an account? Login
        </AppText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      justifyContent: 'center',
      padding: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 30,
      textAlign: 'center',
      lineHeight: 22,
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
