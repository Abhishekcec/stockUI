import React, { useEffect } from 'react'
import getAllCompanies from "../../services/getAllCompanies.service"
import deleteCompanyDetails from "../../services/deleteCompanyDetails.service"
import "./displayAllCompanies.component.css"
import DeleteIcon  from '../../shared/delete-icon/delete-icon.component'
  
const DisplayAllCompanies =()=>{
  const [companies,setCompanies]=React.useState([]);

  useEffect(()=>{
      getAllCompanies().then((res)=>{
         setCompanies(res);
      });
  },[]);

  const deleteComapny=(companyCode)=>{
    deleteCompanyDetails(companyCode).then((res)=>{
            if(res==="Company deleted Successfully and Stocks deleted Successfully"){
              getAllCompanies().then((res)=>{
                setCompanies(res);
             });
            }
    });
  };

    return (
      <div className="all-companies-container">
        <h3>Companies List</h3>
        <div className="company-detail-row-heading">
                            <div className='table-heading'>Company Name
                            </div>
                            <div className='table-heading'>CompanyCode
                            </div>
                            <div className='table-heading'>
                            Company Website
                            </div>
                            <div className='table-heading'>Company Turnover
                            </div>
                            <div className='table-heading'>Delete Company
                            </div>
                            
                        </div>
       
            { companies?.length>0&&
              companies?.map((company) => {
                    return (
                        <div key={company.companyCode} className="company-detail-row">
                            <div>
                               {company.companyName}
                            </div>
                             
                            <div>
                            {company.companyCode}
                            </div>
                            <div>
                           <a href={company.companyWebsite}>{company.companyWebsite}</a>
                            </div>
                            <div> 
                            {company.companyTurnover}
                            </div>
                            {/* <div className="delete-icon" onClick={()=>{deleteComapny(company.companyCode)}}><DeleteIcon/></div> */}
                            <div className="delete-icon" onClick={()=>{deleteComapny(company.companyCode)}}>
                              {/* <i class="fa fa-trash"></i> */}
                              <i class="material-icons">delete</i>
                              </div>
                        </div>
                    );
              })
            }
      </div>
    )
  }

  export default DisplayAllCompanies;