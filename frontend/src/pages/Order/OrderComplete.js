import React from 'react'
import styles from "./Style/order.module.css"
function OrderComplete() {
  return (
    <div className={styles.mcontainer}>
    <div className={styles.message}>Payment Screenshot uploaded. You will be mailed within 48 hrs regrading payment confirmation.</div>
    </div>
  )
}

export default OrderComplete