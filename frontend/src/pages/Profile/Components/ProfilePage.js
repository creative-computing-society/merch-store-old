import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Style/ccsbulb.module.css";
import Navbar from "../../Navbar/Navbar"
import AuthContext from "../../../store/auth-context";

import ccsbulb from "../Assets/CCS_Bulb.png"

import Zoom from 'react-reveal/Zoom';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import axios from "axios";

import { api_url } from "../../../config";
const user_url = api_url + "auth/user/"
const orders_url = api_url + "order/all/"

function ProfilePage() {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token")

    const config = {
      headers: {
        "Authorization": `Token ${token}`
      }
    }

    const fetchData = async () => {
      const res = await axios.get(user_url, config)
      console.log(res.data)
      setUserDetails(res.data);
    }

    fetchData()

  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")

    const config = {
      headers: {
        "Authorization": `Token ${token}`
      }
    }

    const fetchData = async () => {
      const res = await axios.get(orders_url, config)
      setPreviousOrders(res.data);
    }

    fetchData()

  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <Navbar theme={"light"}/>
        <hr
          style={{
            background: 'white',
            color: 'white',
            borderColor: 'white',
            height: '0.6px',
            width: '70%',
          }}
        />
        <div className={styles.subcontainer}>
          User: {userDetails.name}
        </div>
        <div className={styles.subcontainer}>
          Previous Orders :-
        </div>

        <div >

          {previousOrders.length == 0 &&
            <div className={styles.orderContainer}>
              <div className={styles.order}>
                You have no previous orders
              </div>
            </div>
          }

          {previousOrders &&
            <div className={styles.orderContainer}>
              {previousOrders.map(item => {
                return (
                  <div className={styles.order}>
                    {item.order_items.map(product => {
                      return (
                        <div>{product.product.name} {product.printing_name} {product.size} ₹{product.product.price}</div>
                      )
                    })}
                     Total: {item.amount}
                  </div>
                )
              })}
            </div>
          }

        </div>

      </div>
      <div className={styles.subcontainer}>
        <button className={styles.button} onClick={() => {navigate("/change-password")}}>Change Password</button>
      </div>
    </div>


  );
}

export default ProfilePage;