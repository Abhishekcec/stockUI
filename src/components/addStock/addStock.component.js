import "./addStock.component.css"
import React from "react"
import addStockDetails from "../../services/addStockDetails.service"


const AddStock = (props) => {

    const [companyCode, setCompanyCode] = React.useState("");
    const [stockPrice, setStockPrice] = React.useState(0);
    // const [companyWebsite, setCompanyWebSite] = React.useState("");
    // const [companyTurnover, setCompanyTurnover] = React.useState("");
    const [companyCodeValid, setCompanyCodeValid] = React.useState({});
    const [stockPriceValid, setStockPriceValid] = React.useState({});
    // const [companyWebsiteValid, setCompanyWebSiteValid] = React.useState({});
    // const [companyTurnOverValid, setCompanyTurnOverValid] = React.useState({});
    const [error,setError]=React.useState("");

    const handleValidations = () => {

        let error = false;

        //Company Name Validation it should contain only alphabets and length should be 2 to 30
        if (companyCode.length === 0) {
            error = true;
            setCompanyCodeValid({ valid: false, errorMessage: "Invalid Company code - It should not be Empty" });
        }
        else if (companyCode.match(/^([a-z A-Z0-9]){2,30}$/)) {
            setCompanyCodeValid({});
        } else {
            error = true;
            setCompanyCodeValid({ valid: false, errorMessage: "Invalid Company Code-it should contain only alphabets and length should be 3 to 30" });
        }

        if (stockPrice.length === null) {
            error = true;
            setStockPriceValid({ valid: false, errorMessage: "Invalid Stock Price-it should not be empty" });
        } else if (stockPrice > 0 && stockPrice < 1000000) {
            setStockPriceValid({});
        } else {
            error = true;
            setStockPriceValid({ valid: false, errorMessage: "Invalid Stock Price -It should be number > 0 and < 1000000" });
        }

        return error;

    }

    const handleAddStock = () => {

        if (!handleValidations()) {

            const stockPayload={
                companyCode,
                price : parseInt(stockPrice)
            }
            addStockDetails(stockPayload).then((res)=>{
                if(res==="saved successfully")
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
        <div className="addCompanyComponent">
            <h3 className = "heading-stock">Add Stock Price</h3>
            <div className="form-row">
                {
                    Object.keys(companyCodeValid).length > 0 && companyCodeValid.valid === false &&
                    <label className="error-container">
                        {companyCodeValid.errorMessage}
                    </label>
                }
                <div className="form-column">
                    <div className="form-label-stock">
                        Company Code
                    </div>
                    <div className="form-input">

                        <input
                            type="text"
                            value={companyCode}
                            onChange={(event) => { setCompanyCode(event.target.value) }}
                        >
                        </input>
                    </div>
                </div>

            </div>
            <div className="form-row">
                {
                    Object.keys(stockPriceValid).length > 0 && stockPriceValid.valid === false &&
                    <label className="error-container">
                        {stockPriceValid.errorMessage}
                    </label>
                }
                <div className="form-column">
                    <div className="form-label-stock">
                        Stock Price
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            value={stockPrice}
                            onChange={(event) => { setStockPrice(event.target.value) }}
                        >
                        </input>
                    </div>

                </div>

            </div>
           

            <button className="form-row add-company-btn" onClick={() => handleAddStock()}>
                Add Stock
            </button>
            {error.length>1 && <div className="error-container">

                {error}

            </div>}

        </div>

    );

}


export default AddStock;