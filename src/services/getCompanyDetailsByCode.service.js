import axios from "axios";

const getCompanyDetailsByCode = (companyCode) => {
  const token=localStorage.getItem("token");
  const config = {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization':`Bearer ${token}`
    }
  };

  return axios
    .post(`http://54.80.172.54:8087/api/v1.0/market/company/info/${companyCode}`,{}, config)
    // .post(`https://zu16ejpj51.execute-api.us-east-1.amazonaws.com/prod/info/${companyCode}`,{}, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.log(error);
    });


}

export default getCompanyDetailsByCode;