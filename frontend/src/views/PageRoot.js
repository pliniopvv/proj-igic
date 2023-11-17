import { Outlet } from "react-router-dom";
import NavMenu from "../components/nav-menu";
import React from "react";

function PageRoot() {
    return (
        <React.Fragment>
            <NavMenu />
            <Outlet />
        </React.Fragment>
    );
}

export default PageRoot;