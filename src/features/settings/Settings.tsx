import { AppButton, AppContainer } from '@/components';
import { useSignOut } from '@/store/selectors/authSelectors';
import React from 'react';
const Settings = () => {
  const signOut = useSignOut();

  return (
    <AppContainer>
      <AppButton title="Logout" onPress={signOut} />
    </AppContainer>
  );
};

export default Settings;
