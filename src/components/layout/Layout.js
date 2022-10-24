import React, {Fragment} from 'react';
import './layout.scss'
import {AddClass} from "../../high_order_components/AddClass";
import {Header} from "../header/Header";
import {Home} from "../pages/home/Home";
import {SideBar} from "../sidebar/SideBar";

const Layout = () => {
    return (
        <Fragment>
            <Header/>
            <div className='content'>
                <div className='routes'>
                    <Home/>
                </div>
                <SideBar/>
            </div>
        </Fragment>
    )
};

export default AddClass(Layout, 'layout');