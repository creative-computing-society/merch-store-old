import React from "react";
import styles from "../Style/navbar.module.css"
function Navbar() {
    return (
        <div className={styles.navbar}>
            <a href="/">HOME</a>
            <a href="products">PRODUCTS</a>
            <a href="cart">CART</a>
            <a href="profile">PROFILE</a>
        </div>
    );
}

export default Navbar;