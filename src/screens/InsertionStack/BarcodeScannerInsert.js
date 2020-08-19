import React, { useState, useEffect, memo } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

function BarcodeScannerInsert({ navigation: { navigate }, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(()=>{
    setScanned(false);
  },[])

  const handleBarCodeScanned = ({ type, data }) => {
    //setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigate("InsertProcedure", {rawdata:data});
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      
        <Button
          mode="contained"
          title={scanned?"scanned":"手動輸入"}
          onPress={() => {
            navigate("InsertProcedure");
          }}
        />
    </View>
  );
}
export default memo(BarcodeScannerInsert);