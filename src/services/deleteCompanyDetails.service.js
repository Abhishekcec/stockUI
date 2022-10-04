import axios from "axios"

const deleteCompanyDetails=(companyCode)=>{
  const token=localStorage.getItem("token");
  const config={
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':"*",
      'Authorization':`Bearer ${token}`
    }
  };
    
  return  axios
    .delete(`http://54.80.172.54:8087/api/v1.0/market/company/delete/${companyCode}`,config)
    // .delete(`https://zu16ejpj51.execute-api.us-east-1.amazonaws.com/prod/delete/${companyCode}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

}

export default deleteCompanyDetails;