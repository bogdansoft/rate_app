import React, {Fragment, useContext, useState} from "react";
import './modal.scss';
import {Register} from "../register/Register";
import {Login} from "../login/Login";
import {RateContext} from "../../context/RateContext";

export const Modal = () => {

    const {state, modalHideHandler} = useContext(RateContext)
    const [value, setValue] = useState('login')
    const links = [{name: 'Enter', id: 'login'}, {name: 'Registration', id: 'register'}]
    const cls = ['modal']

    const windowHandler = (id) => {
        setValue(id)
    }

    if (state.showModal) {
        cls.push('modalShow')
    }

    return (
        <div className={cls.join(' ')}>
            <Fragment>
                <div className='modalHead'>
                    <ul>
                        {links.map((item, i) => {
                            return (
                                <li style={{fontWeight: item.id === value ? 'bold' : 'normal', cursor: 'pointer'}}
                                    key={item.name}
                                    onClick={() => windowHandler(item.id)}>{item.name}</li>
                            )
                        })}
                    </ul>
                    <i className='fa fa-times' aria-hidden='true' onClick={modalHideHandler}/>
                </div>
                <hr/>
            </Fragment>
            <div style={{textAlign: 'center'}}>
                <h2 style={{color: '#f01f30'}}>{state.error}</h2>
            </div>
            {value === 'register' ? <Register/> : <Login/>}
        </div>
    )
};
