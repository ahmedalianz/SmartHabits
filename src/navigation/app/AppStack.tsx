import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HabitsStack from './HabitsStack';
import SettingsStack from './SettingsStack';
import useAppTheme from '@/hooks/useAppTheme';
import { AppText } from '@/components';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const { colors } = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen
        name="HabitsStack"
        component={HabitsStack}
        options={{
          tabBarLabel: 'Habits',
          tabBarIcon: () => <AppText>icon</AppText>,
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => <AppText>icon</AppText>,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
