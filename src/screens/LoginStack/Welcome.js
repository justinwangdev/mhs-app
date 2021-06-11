import React, { memo } from 'react';

import { Background, Logo, Header, Button, Paragraph } from '../../components/';
import { language } from '../../core/languages';

const Welcome = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>MHS</Header>

    <Paragraph>
      Est. 1978
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      {language.login}
    </Button>

  </Background>
);

export default memo(Welcome);
