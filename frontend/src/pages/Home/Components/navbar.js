import React from "react";
import styles from "../Style/navbar.module.css"
function Navbar() {
    return (
        <div className={styles.navbar}>
            <a class="active" href="#">HOME</a>
            <a href="#about">PRODUCTS</a>
            <a href="#contact">CART</a>
            <a href="#contact">PROFILE</a>
        </div>
    );
}

export default Navbar;