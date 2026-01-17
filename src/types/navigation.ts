import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// RootStack
//  ├─ AuthStack
//  │   ├─ Login
//  │   └─ Register
//  └─ AppStack
//      ├─ HabitsStack
//      └─ SettingsStack

// Global type declaration
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
//RootStack
export type RootStackParamList = {
  AppStack: undefined;
  AuthStack: undefined;
};
// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

//AppStack
// Root Tab Navigator
export type RootTabParamList = {
  HabitsStack: undefined;
  SettingsStack: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;

// Habits Stack
export type HabitsStackParamList = {
  HabitsList: undefined;
  AddItem: undefined;
  Details: { habitId: string };
};
export type HabitsStackScreenProps<T extends keyof HabitsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HabitsStackParamList, T>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

// Settings Stack
export type SettingsStackParamList = {
  Settings: undefined;
};

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SettingsStackParamList, T>,
    RootTabScreenProps<keyof RootTabParamList>
  >;
