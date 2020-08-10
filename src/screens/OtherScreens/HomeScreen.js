import React, { memo } from 'react';

import { AuthContext } from '../../core/Context';
import { Background, Logo, Header, Paragraph, Button } from '../../components';

const HomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <Background>
      <Logo />
      <Header>Let’s work</Header>
      <Paragraph>
        You are working.
    </Paragraph>
      <Button onPress={() => signOut()}>
        Logout
    </Button>
    </Background>
  );
}

export default memo(HomeScreen);
