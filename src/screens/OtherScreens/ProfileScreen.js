import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Background, Paragraph, Header } from '../../components';
import { apis } from '../../core/apis';
import IndicatorScreen from '../OtherScreens/IndicatorScreen';
import { language } from '../../core/languages';

const ProfileScreen = () => {
  const [employeeName, setEmployeeName] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEmployeeName();
  }, [])

  async function getEmployeeName() {
    var userToken;
    try {
      userToken = await AsyncStorage.getItem('userToken')
    } catch (e) {
      console.log(e);
    }
    return fetch(`${apis.apiUserInfo}/employeeName/${userToken}`)
      .then((response) => response.json())
      .then((responsejson) => {
        if (!(responsejson.length < 1 || responsejson == undefined)) {
          setEmployeeName(responsejson[0].EmployeeName);
          setIsLoading(false);
        } else {
          alert("ERROR")
        }
      });
  }

  if (isLoading) return (<IndicatorScreen />)
  else
    return (
      <Background>
        <Header>{language.userInfo}</Header>
        <Paragraph>{`${language.name}${employeeName}`}</Paragraph>
      </Background>
    );
};

export default React.memo(ProfileScreen);

