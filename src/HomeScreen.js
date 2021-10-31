import React from 'react'
import Navbar from './components/Navbar'
import Banner from "./components/Banner";
import "./HomeScreen.css"

function HomeScreen() {
  return (
    <div className="homeScreen">
      {/* NAVBAR */}
      <Navbar />
      <Banner />
    </div>
  );
}

export default HomeScreen
