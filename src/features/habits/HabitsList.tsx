import useAppTheme from '@/hooks/useAppTheme';
import React from 'react';
import { Text, View } from 'react-native';

const HabitsList = () => {
  const { colors } = useAppTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Home</Text>
    </View>
  );
};

export default HabitsList;
