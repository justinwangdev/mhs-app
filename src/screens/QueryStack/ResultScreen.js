import React, { memo, useState, useEffect } from 'react';
import { Background, BackButton } from '../../components';

const ResultScreen = ({ navigation, route }) => {
    var rawData = {};

    useEffect(() => {
        if (route.params?.rawData) {
            rawData = route.params["rawData"];
        } else {
            rawData = "";
        }
        console.log(rawData)
    });

    return (
        <Background>
            <BackButton goBack={() => navigation.goBack()} />
        </Background>
    )
}

export default memo(ResultScreen);