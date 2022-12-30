import React from "react";
import { Link } from "react-router-dom";
import styles from "./Style/navbar.module.css";
import logo from "./Assets/logo.png";
function Navbar(props) {
    console.log(props.theme)

    return (
        <div className={styles.navbar}>
            {!(props.logo == false) && <img src={logo} alt="react logo"/>}
            <div className={styles.links}>
                <Link to="/" style={{color: props.theme == "light"?"#fff":"#000"}}>HOME</Link>
                {/* <Link to="/products" style={{color: props.theme == "light"?"#fff":"#000"}}>PRODUCTS</Link> */}
                <Link to="/cart" style={{color: props.theme == "light"?"#fff":"#000"}}>CART</Link>
                <Link to="/profile" style={{color: props.theme == "light"?"#fff":"#000"}}>PROFILE</Link>
            </div>
        </div>
  );
}

export default Navbar;
