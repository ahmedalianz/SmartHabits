/* eslint-disable react-native/no-unused-styles */
import useAppTheme from '@/hooks/useAppTheme';
import { Colors } from '@/theme/colors';
import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
} & TouchableOpacityProps;

const AppButton = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  disabled,
  isLoading,
  ...props
}: AppButtonProps) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={onPress ? disabled : true}
      style={[styles.button, disabled && styles.buttonDisabled, containerStyle]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[styles.text, textStyle]}
          testID={props?.testID ? `${props.testID}-text` : undefined}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    button: {
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      marginTop: 8,
      opacity: 1,
      backgroundColor: colors.primary,
    },
    text: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonDisabled: { opacity: 0.6 },
  });
export default AppButton;
