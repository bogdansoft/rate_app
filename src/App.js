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
                USD: {name: 'Dollar США', flag: USD, course: ''},
                CNY: {name: 'Chinese Uan', flag: CNY, course: ''},
                EUR: {name: 'Euro', flag: EUR, course: ''},
                GBP: {name: 'Funt Sterling', flag: GBP, course: ''},
                JPY: {name: 'Japanese Jena', flag: JPY, course: ''},
                CHF: {name: 'Swiss Frank', flag: CHF, course: ''},
            },
            //calculator
            inputValue: 100,
            currencyValue: 'USD',
            result: null
        }
    }

    inputValueHandler = (event) => {
        this.setState({inputValue: event.target.value, result: null})
    }

    currencyValueHandler = (event) => {
        this.setState({inputValue: event.target.value, result: null})
    }

    calculatorHandler = async (value) => {
        let result
        await fetch(`https://api.exchangeratesapi.io/latest?base=EUR`)
            .then((response) => response.json())
            .then((response) => {
                result = response.rates[value] * this.state.inputValue
            })
        this.setState({result})
    }

    componentDidMount() {

        fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then((response) => response.json()).then((response) => {
            const rateArr = ['USD', 'CNY', 'EUR', 'GBP', 'JPY', 'CHF']
            const currency = {...this.state.currency}
            for (let i = 0; i < rateArr.length; i++) {
                currency[rateArr[i]].course = response.rates[rateArr[i]]
            }
            console.log(currency)
            this.setState({
                rate: response.rates,
                date: response.date,
                currency
            })
        })
    }

    render() {
        return (
            <RateContext.Provider value={{
                state: this.state,
                inputValueHandler: this.inputValueHandler,
                currencyValueHandler: this.currencyValueHandler,
                calculatorHandler: this.calculatorHandler,
            }}>
                <Layout/>
            </RateContext.Provider>
        );
    }
}

export default App;
