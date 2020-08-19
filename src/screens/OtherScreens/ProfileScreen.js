import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Background, Paragraph, Header } from '../../components';
import { apis } from '../../core/apis';

const ProfileScreen = () => {
  const [employeeName, setEmployeeName] = useState();

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
    return fetch(apis.apiGetEmployeeName, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userToken: userToken,
      }),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (!(responsejson.length < 1 || responsejson == undefined)) {
          setEmployeeName(responsejson[0].EmployeeName);
        } else {
          alert("ERROR")
        }
      });
  }

  return (
    <Background>
      <Header>個人資料</Header>
      <Paragraph>{`姓名： ${employeeName}`}</Paragraph>
    </Background>
  );
};

export default React.memo(ProfileScreen);

