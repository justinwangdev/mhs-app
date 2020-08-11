import React, { memo, useState, useEffect } from 'react';

import { Background, Header, BackButton } from '../../components';
import { apis } from '../../core/apis';

const ResultScreen = ({ navigation, route }) => {
    return (
        <Background>
            <BackButton goBack={() => navigation.goBack()} />
            <Header>查詢結果</Header>
        </Background>
    )
}

export default memo(ResultScreen);