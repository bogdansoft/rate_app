import React, {Fragment, useContext} from 'react';
import './layout.scss'
import {AddClass} from "../../high_order_components/AddClass";
import {Header} from "../header/Header";
import {Home} from "../pages/home/Home";
import {SideBar} from "../sidebar/SideBar";
import {Route, Switch} from "react-router-dom";
import {Calc} from "../pages/calc/Calc";
import {Sample} from "../pages/sample/Sample";
import {Info} from "../pages/info/Info";
import {RateContext} from "../../context/RateContext";

const Layout = () => {

    const {state} = useContext(RateContext)

    return (
        <Fragment>
            <Header/>
            <div className='content'>
                <div className='routes'>
                    {state.auth ?
                        <Switch>
                            <Route path='/' exact component={Home}/>
                            <Route path='/calc' render={() => <Calc/>}/>
                            <Route path='/sample' render={() => <Sample/>}/>
                            <Route path='/info' render={() => <Info/>}/>
                        </Switch>
                        : <Route path='/' component={Home}/>
                    }


                </div>
                <SideBar/>
            </div>
        </Fragment>
    )
};

export default AddClass(Layout, 'layout');
