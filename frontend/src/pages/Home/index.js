import React from "react";
import Products from "./Components/Products";
import Hero from "./Components/Hero";


function Home() {
  return (
    <div style={{backgroundColor: "#eeeeee"}}>
      <Hero/>
      <Products />
    </div>
  );
}

export default Home;