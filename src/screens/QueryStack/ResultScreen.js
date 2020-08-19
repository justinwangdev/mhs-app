import React, { memo, useState, useEffect } from 'react';
import { Background, BackButton, Header, Paragraph } from '../../components';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

const ResultScreen = ({ navigation, route }) => {
    const [tableContent, setTableContent] = useState();
    const [containerNo, setContainerNo] = useState(0);
    const [productContent, setProductContent] = useState();
    const rawData = route.params.rawData;
    const numOfContainers = rawData.containers.length - 1;

    useEffect(() => {
        let product = rawData.product[0];
        setProductContent(
            <Paragraph>
                {` ${product.ProductType}\n`}
                {`${product.spec1}${product.spec2} `}
                {`${product.nutshape}${product.size1}*${product.size2}`}
                {product.size3 != null? (`*${product.size3}`):(``)}
            </Paragraph>
        )
    }, [])

    useEffect(() => {
        var tmpContent = [];
        var procedure = {};
        let container = rawData.containers[containerNo + 1];
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
            {productContent}
            <ScrollView style={{ width: '100%', marginBottom: '10%' }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>製程</DataTable.Title>
                        <DataTable.Title numeric>重量</DataTable.Title>
                        <DataTable.Title numeric>回重</DataTable.Title>
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