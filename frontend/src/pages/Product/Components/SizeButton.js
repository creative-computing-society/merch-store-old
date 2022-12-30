import React from 'react'
import styles from "../Style/sizeButton.module.css"

function SizeButton(props) {

    const selectSize = () => {
        props.changeSize(props.size)
    }

    return (
        <button onClick={selectSize} className={styles.sizeButton} style={props.selected?{color: "#fff", backgroundColor: "#333"}:{color: "#000", backgroundColor: "transparent"}}>
        {/* <button onClick={selectSize} className={styles.sizeButton}> */}
            {props.size}
        </button>
    )
}

export default SizeButton