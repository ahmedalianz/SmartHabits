import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import useAppTheme from '@/hooks/useAppTheme';

const AppText = ({ style, ...props }: TextProps) => {
  const { colors } = useAppTheme();

  return (
    <Text style={[styles.default, { color: colors.text }, style]} {...props} />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: 'System',
  },
});

export default AppText;
