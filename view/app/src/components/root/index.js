import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../navigation";
import Footer from "../footer";

const Root = () => {
    return(
        <div className="Root">
            <Navigation/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Root;