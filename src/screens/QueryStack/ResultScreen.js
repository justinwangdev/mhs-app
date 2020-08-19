import React, { memo, useState, useEffect } from 'react';
import { Background, BackButton, Header } from '../../components';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

const ResultScreen = ({ navigation, route }) => {
    const [tableContent, setTableContent] = useState();
    const [containerNo, setContainerNo] = useState(0);
    const rawData = route.params.rawData;
    const numOfContainers = rawData.containers.length - 1 ;

    useEffect(() => {
        var tmpContent = [];
        var procedure = {};
        let container = rawData.containers[containerNo + 1];
        console.log(container);
        for (var key in rawData.name) {
            for (var index in container) {
                if (container[index].flowno == rawData.code[key]) {
                    procedure = container[index];
                }
            }
            var newItem = (
                <DataTable.Row key={rawData.code[key]}>
                    <DataTable.Cell>{rawData.name[key]}</DataTable.Cell>
                    <DataTable.Cell numeric>{procedure.goweight}</DataTable.Cell>
                    <DataTable.Cell numeric>{procedure.backweight}</DataTable.Cell>
                </DataTable.Row>
            )
            tmpContent.push(newItem);
        }
        setTableContent(tmpContent);
    }, [containerNo])

    return (
        <Background>
            <BackButton goBack={() => navigation.goBack()} />
            <Header>查詢結果</Header>
            <ScrollView style={{ width: '100%', marginTop: '5%', marginBottom: '10%' }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>製程</DataTable.Title>
                        <DataTable.Title numeric>來重</DataTable.Title>
                        <DataTable.Title numeric>去重</DataTable.Title>
                    </DataTable.Header>

                    {tableContent}

                    <DataTable.Pagination
                        page={containerNo}
                        numberOfPages={numOfContainers}
                        onPageChange={page => {
                            setContainerNo(page);
                        }}
                        label={`桶號：${containerNo + 1} / ${numOfContainers}`}
                    />
                </DataTable>
            </ScrollView>
        </Background>
    )
}

export default memo(ResultScreen);