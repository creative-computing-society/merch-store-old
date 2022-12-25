import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import React from "react";
import './App.css';
import LoginPage from "./pages/Login/loginpage.js"
import Home from "./pages/Home/index.js"


function App() {
  let user = localStorage.getItem("user")

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
