import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';

function Redirect(props) {
    const location = useLocation();
    const payment_session_id = location.state.payment_session_id

    useEffect(() => {
      const timeout = setTimeout(() => {
        console.log(payment_session_id)
        // window.location.replace(props.link);
      }, 3000);
  
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <>Will redirect in 3 seconds...</>
    );
  }

export default Redirect