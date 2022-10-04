import "./addCompany.component.css"
import React from "react"
import addCompanyDetails from "../../services/addCompanyDetails.service"


const AddCompany = (props) => {

    const [companyName, setCompanyName] = React.useState("");
    const [companyCEO, setCompanyCEO] = React.useState("");
    const [companyWebsite, setCompanyWebSite] = React.useState("");
    const [companyTurnover, setCompanyTurnover] = React.useState("");
    const [companyNameValid, setCompanyNameValid] = React.useState({});
    const [companyCEOValid, setCompanyCEOValid] = React.useState({});
    const [companyWebsiteValid, setCompanyWebSiteValid] = React.useState({});
    const [companyTurnOverValid, setCompanyTurnOverValid] = React.useState({});
    const [error,setError]=React.useState("");

    const handleValidations = () => {

        let error = false;

        //Company Name Validation it should contain only alphabets and length should be 2 to 30
        if (companyName.length === 0) {
            error = true;
            setCompanyNameValid({ valid: false, errorMessage: "Invalid Company Name-It should not be Empty" });
        }
        else if (companyName.match(/^([a-z A-Z]){2,30}$/)) {
            setCompanyNameValid({});
        } else {
            error = true;
            setCompanyNameValid({ valid: false, errorMessage: "Invalid Company Name-it should contain only alphabets and length should be 2 to 30" });
        }




        //Company CEO Validation it should contain only alphabets and length should be 2 to 30
        if (companyCEO.length === 0) {
            error = true;
            setCompanyCEOValid({ valid: false, errorMessage: "Invalid Company CEO-it should not be empty" });
        } else if (companyCEO.match(/^([a-z A-Z]){2,30}$/)) {
            setCompanyCEOValid({});
        } else {
            error = true;
            setCompanyCEOValid({ valid: false, errorMessage: "Invalid Company CEO-It should contain only alphabets and length should be 2 to 30" });
        }

        if (companyWebsite.length === 0) {
            error = true;
            setCompanyWebSiteValid({ valid: false, errorMessage: "Invalid Company Website-It should not be Empty" });
        } else {
            try {
                let isValid = Boolean(new URL(companyWebsite));
                if (isValid) {
                    setCompanyWebSiteValid({});
                } else {
                    error = true;
                    setCompanyWebSiteValid({ valid: false, errorMessage: "Invalid Company Website-please give Valid URL like http://www.iiht.com" });
                }
            }
            catch (e) {
                setCompanyWebSiteValid({ valid: false, errorMessage: "Invalid Company Website-please give Valid URL" });
                error = true;
            }
        }
        //company TurnOver should be greater than 10000000
        if (companyTurnover.length === 0) {
            setCompanyTurnOverValid({ valid: false, errorMessage: "Invalid Company TurnOver-It should not be Empty" })
            error = true;
        }
        else if (parseInt(companyTurnover) >= 10000000) {
            setCompanyWebSiteValid({});
        } else {
            setCompanyTurnOverValid({ valid: false, errorMessage: "Invalid Company TurnOver-please give turnover more than 10000000" })
            error = true;
        }


        return error;

    }

    const handleAddCompany = () => {

        if (!handleValidations()) {

            const companyPayload={
                companyName,
                companyCEO,
                companyWebsite,
                companyTurnover : parseInt(companyTurnover)
            }
            addCompanyDetails(companyPayload).then((res)=>{
                if(res==="Successfully Registered Company")
                    props.setRenderTab("list-companies");
                else if(res==="Company Already exists"){
                    setError(res);
                }else{
                    setError("Something Went Wrong");
                }
            });

          
        }

    }

    return (
        <div className="company-component">
        <div className="addCompanyComponent">
            <h3 className = "heading-comp">Register company</h3>
            <div className="form-row">
                {
                    Object.keys(companyNameValid).length > 0 && companyNameValid.valid === false &&
                    <label className="error-container">
                        {companyNameValid.errorMessage}
                    </label>
                }
                <div className="form-column">
                    <div className="form-label-comp">
                        Company Name
                    </div>
                    <div className="form-input">

                        <input
                            type="text"
                            value={companyName}
                            onChange={(event) => { setCompanyName(event.target.value) }}
                        >
                        </input>
                    </div>
                </div>

            </div>
            <div className="form-row">
                {
                    Object.keys(companyCEOValid).length > 0 && companyCEOValid.valid === false &&
                    <label className="error-container">
                        {companyCEOValid.errorMessage}
                    </label>
                }
                <div className="form-column">
                    <div className="form-label-comp">
                        Company CEO
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            value={companyCEO}
                            onChange={(event) => { setCompanyCEO(event.target.value) }}
                        >
                        </input>
                    </div>

                </div>

            </div>
            <div className="form-row">
                {
                    Object.keys(companyWebsiteValid).length > 0 && companyWebsiteValid.valid === false &&
                    <label className="error-container">
                        {companyWebsiteValid.errorMessage}
                    </label>
                }
                <div className="form-column">
                    <div className="form-label-comp">
                        Company Website
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            value={companyWebsite}
                            onChange={(event) => { setCompanyWebSite(event.target.value) }}
                        >
                        </input>
                    </div>

                </div>

            </div>
            <div className="form-row">
                {
                    Object.keys(companyTurnOverValid).length > 0 && companyTurnOverValid.valid === false &&
                    <label className="error-container">
                        {companyTurnOverValid.errorMessage}
                    </label>
                }
                <div className="form-column">
                    <div className="form-label-comp">
                        Company TurnOver
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            value={companyTurnover}
                            onChange={(event) => { setCompanyTurnover(event.target.value) }}
                        >
                        </input>
                    </div>

                </div>

            </div>

            <button className="form-row add-company-btn" onClick={() => handleAddCompany()}>
                Add Company
            </button>
            {error.length>1 && <div className="error-container">

                {error}

            </div>}

        </div>
        </div>

    );

}


export default AddCompany;