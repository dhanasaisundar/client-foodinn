/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Outlet } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import "./index.css";

function AppLayout({ auth, handleAuthBtn }) {
  return (
    <div className="appLayout">
      <Navbar handleAuthBtn={handleAuthBtn} />
      <Outlet handleAuthBtn={handleAuthBtn} />
      {auth && (
        <div className="overlay">
          <Auth handleAuthBtn={handleAuthBtn} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AppLayout;
