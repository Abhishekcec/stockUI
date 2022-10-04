import axios from "axios"

const addStockDetails=(stock)=>{
  const token=localStorage.getItem("token");
  const config={
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':"*",
      'Authorization':`Bearer ${token}`
    }
  };
    
  return  axios
    .post("http://54.80.172.54:8087/api/v1.0/market/stock/add", stock,config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

}

export default addStockDetails;