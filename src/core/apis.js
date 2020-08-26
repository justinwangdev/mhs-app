const serverURL = "http://192.168.1.123:3000/";

export const apis = {
  apiLogin: `${serverURL}login`,
  apiCodeTable: `${serverURL}codetable`,
  apiContainerflow:`${serverURL}containerflow`,
  apiPurchaseOrderItem: `${serverURL}purchaseorderitem`,
  apiUserInfo: `${serverURL}userinfo`,
  apiGetEmployeeName: serverURL.concat("users/name")
};
