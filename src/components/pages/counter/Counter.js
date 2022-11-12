import React, {useContext} from "react";
import './counter.scss';
import {RateContext} from "../../../context/RateContext";
import {Button} from "../../button/Button";

export const Counter = () => {

    const {state, inputValueHandler, currencyValueHandler, calculatorHandler} = useContext(RateContext);

    return (
        <div className='calcHead'>
            <div><h4>I want to exchange:</h4></div>
            <div className='operation'>
                <span><input type='number'
                             value={state.inputValue}
                             onChange={inputValueHandler}
                />&nbsp; EUR</span>
                <select onChange={currencyValueHandler}>
                    {Object.keys(state.currency).map((item, i) => {
                        return (
                            <option key={item}>{item}</option>
                        )
                    })}
                </select>
                <Button text='Count' click={calculatorHandler} arg={state.currencyValue}/>
                {/*
                <button onClick={() => calculatorHandler(state.currencyValue)}>Count</button>*/}
            </div>
        </div>
    )
}