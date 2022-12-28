import React from "react";
import styles from "../Style/navbar.module.css"
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link to="/home">HOME</Link>
            <Link to="/products">PRODUCTS</Link>
            <Link to="/cart">CART</Link>
            <Link to="/profile">PROFILE</Link>
        </div>
    );
}

export default Navbar;