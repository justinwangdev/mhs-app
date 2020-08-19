import React, { memo, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { Background, Header, Button, TextInput, DropDown, BackButton } from '../../components';
import { apis } from '../../core/apis';
import { worknoValidator, containernoValidator, containerWeightValidator, procedureValidator } from '../../core/utils';
import { IndicatorScreen } from '../OtherScreens'

const InsertProcedure = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [workno, setWorkno] = useState({ value: route, error: '' });
    const [containerno, setContainerno] = useState({ value: '', error: '' });
    const [weight, setWeight] = useState({ value: '', error: '' });
    const [procedure, setProcedure] = useState({ value: '', error: '' });
    const [codeTable, setCodeTable] = useState();

    var barCodeData = "";

    useEffect(() => {
        if (route.params?.rawdata) {
            barCodeData = route.params["rawdata"];
        } else {
            barCodeData = "";
        }
        setWorkno({ value: barCodeData.substring(0, barCodeData.length - 3) });
        setContainerno({
            value: barCodeData.substring(
                barCodeData.length - 3,
                barCodeData.length)
        });

        fetch(apis.apiGetCodeTable)
            .then((response) => response.json())
            .then((responsejson) => {
                setCodeTable(responsejson);
                setIsLoading(false);
            });
    }, [])

    const _onSubmitPreesed = () => {
        const worknoError = worknoValidator(workno.value);
        const containernoError = containernoValidator(containerno.value);
        const weightError = containerWeightValidator(weight.value);
        const procedureError = procedureValidator(procedure.value);

        if (worknoError || containernoError || weightError || procedureError) {
            setWorkno({ ...workno, error: worknoError });
            setContainerno({ ...containerno, error: containernoError });
            setWeight({ ...weight, error: weightError });
            setProcedure({ ...procedure, error: procedureError });
            return;
        }
        else {
            sendDataToServer();
            return;
        };
    }

    const sendDataToServer = () => {
        return fetch(apis.apiSendInsertion, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                procedureCode: procedure.value,
                workno: workno.value,
                containerno: containerno.value,
                weight: weight.value,
            }),
        })
            .then((response) => response.json())
            .then((responsejson) => {
                if (!(responsejson.length < 1 || responsejson == undefined)) {
                    Alert.alert(
                        '提示',
                        '此流程原本就存在於系統中，重量為'
                        + responsejson[0].goweight
                        + 'KG，已覆寫為' + weight.value + 'kg',
                    )
                } else {
                    Alert.alert(
                        '提示',
                        '新增流程成功！'
                    )
                }
            });
    }

    if (isLoading)
        return (<IndicatorScreen />)
    else
        return (
            <Background>
                <BackButton goBack={() => navigation.goBack()} />
                <Header>新增製程</Header>
                <TextInput
                    label="派工單號"
                    returnKeyType="done"
                    keyboardType="number-pad"
                    value={workno.value}
                    onChangeText={text => setWorkno({ value: text, error: '' })}
                    error={!!workno.error}
                    errorText={workno.error}
                />
                <TextInput
                    label="桶號"
                    returnKeyType="done"
                    keyboardType="number-pad"
                    value={containerno.value}
                    onChangeText={text => setContainerno({ value: text, error: '' })}
                    error={!!containerno.error}
                    errorText={containerno.error}
                />

                <DropDown
                    items={codeTable}
                    placeholder='選擇製程'
                    onChangeItem={item => setProcedure({ value: item.value, error: '' })}
                    error={!!procedure.error}
                    errorText={procedure.error}
                    searchable={true}
                    searchablePlaceholder="查詢製程"
                />

                <TextInput
                    label="重量（公斤）"
                    returnKeyType="done"
                    keyboardType="number-pad"
                    value={weight.value}
                    onChangeText={text => setWeight({ value: text, error: '' })}
                    error={!!weight.error}
                    errorText={weight.error}
                />

                <Button mode="contained" onPress={_onSubmitPreesed}>
                    寫入資料庫
                    </Button>
            </Background>
        )
}

export default memo(InsertProcedure);