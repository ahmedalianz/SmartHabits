/* eslint-disable react-native/no-unused-styles */
import useAppTheme from '@/hooks/useAppTheme';
import { Colors } from '@/theme/colors';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import AppContainer from './AppContainer';
import AppText from './AppText';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  secure?: boolean;
  containerStyle?: ViewStyle;
  testID?: string;
}

const AppInput = ({
  label,
  error,
  touched,
  containerStyle,
  secure,
  testID,
  ...props
}: AppInputProps) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <AppContainer style={[styles.container, containerStyle]} testID={testID}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <AppContainer>
        <TextInput
          testID={testID ? `${testID}-input` : undefined}
          style={[styles.input, touched && error && styles.inputError]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secure && !isPasswordVisible}
          {...props}
        />
        {secure && (
          <TouchableOpacity
            testID={`${testID}-toggle`}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            {/* Replace this Text with an Icon later */}
            <AppText style={{ fontSize: 12 }} testID={`${testID}-toggle-eye`}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </AppText>
          </TouchableOpacity>
        )}
      </AppContainer>

      {error && touched && (
        <AppText
          testID={testID ? `${testID}-error` : undefined}
          style={styles.errorText}
        >
          {error}
        </AppText>
      )}
    </AppContainer>
  );
};
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    input: {
      height: 50,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      color: colors.text,
      borderColor: colors.border,
      fontSize: 16,
    },
    errorText: {
      color: colors.danger,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    inputError: {
      borderColor: colors.danger,
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      height: '100%',
      justifyContent: 'center',
    },
  });
export default AppInput;
