import React from "react";
import { Link } from "react-router-dom";
import styles from "./Style/navbar.module.css"
import logo from "./Assets/logo.png"
function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link to="/">HOME</Link>
            <Link to="/products">PRODUCTS</Link>
            <Link to="/cart">CART</Link>
            <Link to="/profile">PROFILE</Link>
        </div>
    );
}

export default Navbar;