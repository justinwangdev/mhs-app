const serverURL = "http://192.168.1.123:3000/";

export const apis = {
  apiLogin: serverURL.concat("login/checking"),
  apiGetCodeTable: serverURL.concat("barcode/codetable"),
  apiSendInsertion: serverURL.concat("barcode/inserting"),
  apiSendQuery: serverURL.concat("query/forwarding")
};
