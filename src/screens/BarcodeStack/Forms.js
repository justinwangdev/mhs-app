import React, { Component, memo } from "react";
import { StyleSheet, View, Button, Text, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from 'react-native-paper';
import {apis} from '../../core/apis';

const placeholder = {
  label: "選擇流程...",
  value: null,
  color: "#9EA0A4",
};

var barCodeData = "null";
var table = [];

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeTable: [],
      procedureCode: -1,
      workno: "null",
      containerno: "null",
      weight: "輸入重量(KG)", 
      originWeight:"",
      flgHit: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getCodeTableFromServer(() => {
      this.setState({ loading: false });
    });
  }
  getCodeTableFromServer() {
    return fetch(apis.apiGetCodeTable)
      .then((response) => response.json())
      .then((responsejson) => {
        this.setState({
          codeTable: responsejson,
        });
      });
  }

  sendDataToServer() {
    return fetch(apis.apiCheckExist, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        procedureCode: this.state.procedureCode,
        workno: this.state.workno,
        containerno: this.state.containerno,
        weight: this.state.weight,
      }),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        console.log(responsejson, responsejson.length);
        if (!(responsejson.length < 1 || responsejson == undefined)) {
          this.setState(
            {
              originWeight: responsejson[0].goweight,
              flgHit: true,
            },
            () => {
              Alert.alert(
                '提示',
                '此流程原本就存在於系統中，重量為' 
                + this.state.originWeight
                + ' 已覆寫為' + this.state.weight + 'kg',
              )
              this.sendUpdateQuery();
            }
          );
        } else {
          this.setState(
            {
              flgHit: true,
            },
            () => {
              Alert.alert(
                '提示',
                '新增流程成功！'
              )
              this.sendInsertionQuery();
            }
          );
        }
      });
  }
  sendInsertionQuery() {
    console.log(this.state.workno);
    return fetch(apis.apiSendInsertion, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        procedureCode: this.state.procedureCode,
        workno: this.state.workno,
        containerno: this.state.containerno,
        weight: this.state.weight,
      }),
    }).then((response) => response.json());
    //.then((responsejson) => console.log(responsejson));
  }

  sendUpdateQuery() {
    console.log(this.state.workno);
    return fetch(apis.apiSendUpdate, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        procedureCode: this.state.procedureCode,
        workno: this.state.workno,
        containerno: this.state.containerno,
        weight: this.state.weight,
      }),
    }).then((response) => response.json())
      .then((responsejson) => console.log(responsejson));
  }

  render() {
    const { route } = this.props;
    this.state.codeTable.forEach((data) => {
      table.push({ label: data.Name, value: data.Value });
    });

    if (route.params?.barCodeData) {
      barCodeData = route.params["barCodeData"];
    } else {
      barCodeData = "null";
    }

    if (this.state.workno == "null" && barCodeData != "null") {
      this.setState({
        workno: barCodeData.substring(0, barCodeData.length - 3),
        containerno: barCodeData.substring(
          barCodeData.length - 3,
          barCodeData.length
        ),
      });
    }

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            onChangeText={(value) => {
              this.setState({
                workno: value,
              });
            }}
            numeric={"true"}
            keyboardType={'number-pad'}
            label={"派工單號：".concat(this.state.workno.toString())}
            autoCorrect={false}
            placeholder={this.state.workno.toString()}
            style={styles.placeholder}
            mode="outlined"
          />
          <TextInput
            onChangeText={(value) => {
              this.setState({
                containerno: value,
              });
            }}
            numeric={"true"}
            keyboardType={'number-pad'}
            label={"桶號：".concat(this.state.containerno.toString())}
            autoCorrect={false}
            placeholder={this.state.containerno.toString()}
            style={styles.placeholder}
            mode="outlined"
          />
        </View>
        <View>
          <TextInput
            onChangeText={(value) => {
              this.setState({
                weight: value,
              });
            }}
            numeric={"true"}
            keyboardType={'number-pad'}
            label="重量"
            autoCorrect={false}
            placeholder={this.state.weight.toString()}
            style={styles.placeholder}
            mode="outlined"
          />
        </View>
        <View>
          <RNPickerSelect
            onValueChange={(value) => {
              this.setState({
                procedureCode: value,
              });
            }}
            placeholder={placeholder}
            items={table}
            style={pickerSelectStyles}
          />
        </View>
        <View>
          <Button
            title="送出"
            color="darkslateblue"
            onPress={() => {
              if (
                this.state.workno != "null" &&
                this.state.containerno != "null" &&
                this.state.procedureCode != -1 &&
                this.state.weight != "輸入重量(KG)"
              ) {
                this.sendDataToServer();
              } else {
                Alert.alert("資料不完全", "請選擇流程並輸入重量！");
              }
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "40%",
  },
  margin: {},
  placeholder: {
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 20,
    color: "black",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: "black",
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 8,
  },
  inputIOSContainer: {
    paddingHorizontal: 20,
    paddingVertical:5
  },
  inputAndroid: {
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "darkslateblue",
  },
});

export default memo(Forms);
