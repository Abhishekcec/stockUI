import React from "react";
import "./homepage.component.css"
import SearchedComponent from "../searchedcompany/searchedcompany.component"
import DisplayAllCompanies from "../displayallcompanies/displayAllCompanies.component"
import AddCompany from "../addCompany/addCompany.component";
import Header from "../header/header.component";
import AddStock from "../addStock/addStock.component";
import getCompanyDetailsByCode from "../../services/getCompanyDetailsByCode.service";
import getStockDetailsByDate from "../../services/getStockDetailsByDate.service";


const HomePage = () => {

    const [renderTab,setRenderTab]=React.useState("add-company");
    const [companyCode,setCompanyCode] =React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [stockDetails, setStockDetails] = React.useState();
    const [company, setCompany] = React.useState();
 
    const handleCompanyCodeChange = (event) => {
       setCompanyCode(event);
    }

    React.useEffect(() => {
        if(startDate.length===16&&endDate.length===16)
        getStockDetailsByDate(companyCode,startDate,endDate).then((res) => {
            if(Object.keys(res).length>0)
            setStockDetails(res);
        })
    }, [startDate,endDate]);

    return (
        <div className="main-content">
            {/* <Header setDataToBeShown={(tabClassName)=>setRenderTab(tabClassName)} handleCompanyCodeChange={(event)=>handleCompanyCodeChange(event)}/> */}
            <Header companyCode={companyCode} 
            setDataToBeShown={(tabClassName)=>{setRenderTab(tabClassName);  getCompanyDetailsByCode(companyCode).then((res) => {
                setCompany(res?.company);
                setStockDetails(res?.stockDetails);
            });  console.log(tabClassName);}} 
            handleCompanyCodeChange={(event)=>handleCompanyCodeChange(event)}
            />
            {renderTab === "list-companies" ? <DisplayAllCompanies setRenderTab={(event)=>setRenderTab(event)}/> :
             renderTab === "add-company" ? <AddCompany setRenderTab={(event)=>setRenderTab(event)}/> :
             renderTab === "add-stock" ? <AddStock setRenderTab={(event)=>setRenderTab(event)}/> :
            //  renderTab.includes("search-button") ? <SearchedComponent companyCode={companyCode} setRenderTab={(event)=>setRenderTab(event)} /> : null}
            renderTab.includes("search-button") ? <SearchedComponent 
             renderTab={renderTab} 
             startDate={startDate} 
             onStartDateChanged={(date ) => {setStartDate(date)}} 
             endDate={endDate} 
             onEndDateChanged={(date) => {setEndDate(date)}} 
             companyCode={companyCode} 
             setRenderTab={(event)=>setRenderTab(event)} 
             company={company}
             stockDetails={stockDetails}
             /> : null}
        </div>
    )
}


export default HomePage;