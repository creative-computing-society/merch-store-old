import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import React from "react";
import './App.css';
import LoginPage from "./pages/Login/loginpage.js"
import Home from "./pages/Home/index.js"
import Products from "./pages/Products";
import Navbar from "./pages/Navbar/Navbar";
import Product from "./pages/Product";
// import Home from "./pages/Home";

function App() {
  let user = localStorage.getItem("user")

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
        <Route path="/product/:id" element={<Product />}></Route>
      </Routes>
    </Router>
    </div>


  );
}

export default App;
