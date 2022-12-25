import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css';
import LoginPage from "./pages/Login/loginpage.js"
import Home from "./pages/Home/index.js"
import Products from "./pages/Products";
import Navbar from "./pages/Navbar/Navbar";
// import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
    {/* <LoginPage/> */}
    {/* <Home/> */}
    {/* <Navbar /> */}
    {/* <Products /> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/products" element={<Products />}></Route>
      </Routes>
    </Router>
    </div>


  );
}

export default App;
