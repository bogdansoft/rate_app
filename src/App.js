import './App.scss';
import {Component} from "react";
import Layout from "./components/layout/Layout";
import CHF from './image/CHF.png'
import CNY from './image/CNY.png'
import EUR from './image/EUR.png'
import GBP from './image/GBP.png'
import JPY from './image/JPY.png'
import USD from './image/USD.png'
import {RateContext} from "./context/RateContext";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base: 'USD',
            rate: '',
            date: '',
            currency: {
                USD: {name: 'Dollar США', flag: USD, course: '9999999'},
                CNY: {name: 'Chinese Uan', flag: CNY, course: '9999999'},
                EUR: {name: 'Euro', flag: EUR, course: '9999999'},
                GBP: {name: 'Funt Sterling', flag: GBP, course: '9999999'},
                JPY: {name: 'Japanese Jena', flag: JPY, course: '9999999'},
                CHF: {name: 'Swiss Frank', flag: CHF, course: '9999999'},
            }
        }
    }

    render() {
        return (
            <RateContext.Provider value={{state: this.state}}>
                <Layout/>
            </RateContext.Provider>
        );
    }
}

export default App;
