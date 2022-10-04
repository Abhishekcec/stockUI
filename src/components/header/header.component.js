import React from 'react'
import "./header.component.css"
import SearchBox  from '../../shared/searchbox/searchbox.component'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Header=(props)=>  {
  const [companyCode,setCompanyCode] =React.useState("");

  const handleHeaderClicked = (event) => {
    console.log("clicked")
    if(event.target.className === "search-button"){
      props.setDataToBeShown(event.target.className + companyCode);
    }
    props.setDataToBeShown(event.target.className);
  }

  const handleCompanyCodeChange = (event) => {
    props.handleCompanyCodeChange( event.target.value );
    setCompanyCode(event.target.value );
  }

  const navigate=useNavigate();
  const token=localStorage.getItem("token");
  const config={
    headers: {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin':"*",
      'Authorization':`Bearer ${token}`
    }
  };
  const handleLogout=(event)=>{
    const email=localStorage.getItem("email");
    const url=`http://54.80.172.54:8087/api/v1.0/market/user/logout`;
    axios
    .post(url, token.toString(), config)
    .then((response) => {
      if (response.data === "logged out successfully!!") {
        localStorage.clear();
        navigate("/");
      }else{
        alert('something went wrong while logging out')
      }
    })
    .catch((error) => {
      console.log(error);
    });
       
  }

    return (
      <>
         <div className="header-block" >
            <div className="app-logo">
              <img
                src={require("./../../assets/logo.png")}
                alt="company-logo"
                className='company-logo'
              />
            </div>
            <div className="add-company" onClick={(event)=>handleHeaderClicked(event)}>
               Add Company
            </div>
            <div className="add-stock" onClick={(event)=>handleHeaderClicked(event)}>
            Add Stock
            </div>
            <div className="list-companies" onClick={(event)=>handleHeaderClicked(event)}>
              List All Companies
            </div>
            <div className="search-company">
              <SearchBox
                companyCode={props.companyCode}
                onSearchChanged={(event)=>handleCompanyCodeChange(event)}
                onSearchClicked={(event)=>handleHeaderClicked(event)}
              ></SearchBox>
            </div>
            <div className="logout-btn" onClick={(event)=>handleLogout(event)}>
               Log out
            </div>
          </div>
      </>
  )
}
export default Header;