import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './core/Context'
import { language } from './core/languages'
import { MainTabScreens, LoginStackScreens } from './navigations';
import { IndicatorScreen } from './screens/OtherScreens';


const IndexScreens = () => {

  const initLoginState = {
    isLoading: true,
    userToken: null,
    userName: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (token) => {
      try {
        userToken = token
        await AsyncStorage.setItem('userToken', userToken)
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', token: token });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    }
  }), []);

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, [])

  if (loginState.isLoading) {
    return (<IndicatorScreen />)
  }
  else {
    return (
      <AuthContext.Provider value={authContext}>
        {loginState.userToken != null ? (<MainTabScreens />) : (<LoginStackScreens />)}
      </AuthContext.Provider>
    )
  }
}

export default IndexScreens;
