import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../../core/Context';
import { Background, Logo, Header, Button, TextInput, BackButton } from '../../components';
import { theme } from '../../core/theme';
import { apis } from '../../core/apis';
import { usernameValidator, passwordValidator } from '../../core/utils';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const { signIn } = React.useContext(AuthContext);

  const _onLoginPressed = () => {
    const nameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (nameError || passwordError) {
      setUsername({ ...username, error: nameError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    fetch(apis.apiLogin, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => {
      response.json()
        .then((responseJson) => {
          if (responseJson.matching) {
            //navigation.navigate('HomeScreen');
            signIn();
          }
          else {
            if (responseJson.type == "userName") {
              alert("Username not exist!");
            }
            else {
              alert("Wrong password!!");
            }
          }
        })
    })
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Welcome')} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.accent,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
