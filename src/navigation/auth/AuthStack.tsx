import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '@/features/auth/Login';
import Register from '@/features/auth/Register';
import { AuthStackParamList } from '@/types/navigation';
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
