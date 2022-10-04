import "./App.css";
import LoginComponentWithRouter from "./login/login.component";
import {BrowserRouter,Route,Routes } from "react-router-dom";
import HomePage from "./components/homepage/homepage.component";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponentWithRouter />}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
