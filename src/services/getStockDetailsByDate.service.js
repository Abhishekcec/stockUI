
import axios from "axios";

const getStockDetailsByDate = (companyCode,startDate,endDate) => {
  const token=localStorage.getItem("token");
  const config = {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization':`Bearer ${token}`
    }
  };

  return axios
    .post(`http://54.80.172.54:8087/api/v1.0/market/stock/get/${companyCode}/${startDate}/${endDate}`,{}, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return "no company details found!"
    });
}

export default getStockDetailsByDate;