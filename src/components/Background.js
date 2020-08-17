import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { theme } from '../core/theme';

const Background = ({ children }) => (
  <ImageBackground
    style={styles.background}
  >
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle='light-content' />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundcolor,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);
