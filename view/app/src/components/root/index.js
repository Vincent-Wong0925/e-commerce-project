import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../navigation";

const Root = () => {
    return(
        <div className="Root">
            <Navigation/>
            <Outlet/>
        </div>
    );
}

export default Root;