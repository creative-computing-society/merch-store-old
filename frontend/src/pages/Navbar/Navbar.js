import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Style/navbar.module.css";
import logo from "./Assets/logo.png";
import AuthContext from "../../store/auth-context";

function Navbar(props) {
    const authCtx = useContext(AuthContext)

    // console.log(props.theme)

    return (
        <div className={styles.navbar}>
            {!(props.logo == false) && <img src={logo} alt="react logo"/>}
            <div className={styles.links}>
                <Link to="/" style={{color: props.theme == "light"?"#fff":"#000"}}>HOME</Link>
                {/* <Link to="/products" style={{color: props.theme == "light"?"#fff":"#000"}}>PRODUCTS</Link> */}
                <Link to="/cart" style={{color: props.theme == "light"?"#fff":"#000"}}>CART</Link>
                <Link to="/profile" style={{color: props.theme == "light"?"#fff":"#000"}}>PROFILE</Link>
                {authCtx.isLoggedIn ? <Link onClick={authCtx.logout} style={{color: props.theme == "light"?"#fff":"#000"}}>LOGOUT</Link> : <Link to="/login" style={{color: props.theme == "light"?"#fff":"#000"}}>LOGIN</Link>}
                {/* <Link onClick={authCtx.logout} style={{color: "#f24835"}}>LOGOUT</Link> */}
            </div>
        </div>
  );
}

export default Navbar;
