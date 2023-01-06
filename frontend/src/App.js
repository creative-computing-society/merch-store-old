import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import React, {useContext} from "react";
import './App.css';
import LoginPage from "./pages/Login/loginpage.js"
import Home from "./pages/Home/index.js"
// import Products from "./pages/Products";
import Navbar from "./pages/Navbar/Navbar";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order/Order";
import Profile from "./pages/Profile/index.js"
import ChangePassword from "./pages/ChangePassword/Index.js"
import AuthContext from "./store/auth-context";
import Redirect from "./pages/Redirect/Redirect";
// import Home from "./pages/Home";

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
    <Router>
      <Routes>
        {!authCtx.isLoggedIn && <Route path="/login" element={<LoginPage />} />}
        {<Route exact path="/" element={<Home />} />}
        {/* {authCtx.isLoggedIn && <Route path="/products" element={<Products />} />} */}
        {<Route path="/product/:id" element={<Product />} />}
        {authCtx.isLoggedIn && <Route path="/cart" element={<Cart />} />}
        {authCtx.isLoggedIn && <Route path="/order" element={<Order />} />}
        {authCtx.isLoggedIn && <Route path="/redirect" element={<Redirect />} />}
        {authCtx.isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {authCtx.isLoggedIn && <Route path="/change-password" element={<ChangePassword />} />}
        {!authCtx.isLoggedIn && <Route path="*" element={<LoginPage />} />}
        {authCtx.isLoggedIn && <Route exact path="*" element={<Home />} />}

      </Routes>
    </Router>
    </div>


  );
}

export default App;
