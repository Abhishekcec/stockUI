import axios from "axios"

const addCompanyDetails=(company)=>{
  const token=localStorage.getItem("token");
  const config={
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':"*",
      'Authorization' : `Bearer ${token}`
    }
  };

  const header={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':"*",
    'Authorization':`Bearer ${token}`

  }
    
  return  axios
    // .post("https://zu16ejpj51.execute-api.us-east-1.amazonaws.com/prod/register", company, config)
    .post("http://54.80.172.54:8087/api/v1.0/market/company/register", company,config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

}

export default addCompanyDetails;