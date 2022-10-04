import axios from "axios";

const getAllCompanies=()=>{
  const token=localStorage.getItem("token");
    const config={
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':"*",
          'Authorization':`Bearer ${token}`
        }
      };
    
  return  axios
    .get("http://54.80.172.54:8087/api/v1.0/market/company/getall",config)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

}

export default getAllCompanies;