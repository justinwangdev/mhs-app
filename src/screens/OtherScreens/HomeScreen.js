import React, { memo } from 'react';

import { AuthContext } from '../../core/Context';
import { Background, Logo, Header, Paragraph, Button } from '../../components';

const HomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <Background>
      <Logo />
      <Header>上工囉！</Header>
      <Paragraph>
        去工作
    </Paragraph>
      <Button onPress={() => signOut()}>
        登出
    </Button>
    </Background>
  );
}

export default memo(HomeScreen);
