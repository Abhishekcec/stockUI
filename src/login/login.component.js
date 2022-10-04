import React from "react";
import "./login.component.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"

class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    email: "",
    password: "",
    isEmailValid: true,
    isPasswordValid: true,
    errorMessage: "",
    error: false,
  };
}

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateData = (loginDetails) => {

    let error=false;
    if(loginDetails.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
      this.setState({isEmailValid : true});
    }else{
      error=true;
      this.setState({isEmailValid : false});
    }
    
    if(loginDetails.password.length >= 6){
    this.setState({isPasswordValid:  true });
  }else{
    error=true;
    this.setState({isPasswordValid: false});
    }
   return error;
  };

  submitHandler = () => {
    const loginDetails = {
      "userName": this.state.email,
      password: this.state.password,
    };

    // if ( !this.validateData(loginDetails)){
      axios
        .post("http://54.80.172.54:8087/api/v1.0/market/user/authenticate", loginDetails)
        .then((response) => {
          if (response.data === "Password mismatch") {
            this.setState({ ...this.state,error: true, errorMessage: "Password Mismatch" });
          } else if (response.data === "No such user") {
            this.setState({
              ...this.state,
              error: true,
              errorMessage: `user email does not exist`,
            });
          } else {
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            this.props.navigate("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // }
  };
  render() {
    return (
      <>
      <h2 className="head">eStockMarket</h2>
      <div className="login-page">
      <div className="login-box">
        <h3 className="heading">Sign in to your account</h3>
        <div className="form-row">
          {this.state.isEmailValid ?null : <div style={{ color: "red" }}>Email Format Invalid </div>}
          {/* <div className="form-column"> */}
            <div className="form-label"><b>Username</b></div>
            <div className="form-input">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.changeHandler}
              ></input>
            </div>

          {/* </div> */}

        </div>
        <div className="form-row">
        {this.state.isPasswordValid ? null : <div style={{ color: "red" }}>Password Format Invalid </div>}
          {/* <div className="form-column"> */}
          <div className="form-label"><b>Password</b></div>
          <div className="form-input">
            
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
            ></input>
          </div>
          {/* </div> */}
         
        </div>
        <label for="checkbox">
                    <input type="checkbox" name="checkbox"></input> Stay signed in
                  </label>
        <button className="submit-button" onClick={this.submitHandler}>Login</button>
        {this.state.error && <div style={{ color: "red" }}>

          {this.state.errorMessage}

        </div>}
      </div></div></>
    );
  }
}

const LoginComponentWithRouter = (props) => {
  const navigate = useNavigate();
  return <LoginComponent navigate={navigate} />;
};

export default LoginComponentWithRouter;
