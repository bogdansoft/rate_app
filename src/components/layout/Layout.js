import React from 'react';
import './layout.scss'
import {AddClass} from "../../high_order_components/AddClass";
import {Header} from "../header/Header";

const Layout = () => {
    return (
        <Header/>
    )
};

export default AddClass(Layout, 'layout');