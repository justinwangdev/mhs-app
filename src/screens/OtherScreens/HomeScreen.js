import React, { memo } from 'react';

import { AuthContext } from '../../core/Context';
import { Background, Logo, Header, Paragraph, Button } from '../../components';
import { language } from '../../core/languages';

const HomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <Background>
      <Logo />
      <Header>{language.timeToWork}</Header>
      <Paragraph>
        {language.goToWork}
      </Paragraph>
      <Button onPress={() => signOut()}>
        {language.logout}
      </Button>
    </Background>
  );
}

export default memo(HomeScreen);
