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
import axios from "axios";

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
            result: null,
            //sample
            sample: {
                base: 'USD',
                base2: 'EUR',
                date: '',
                course: ''
            },
            sampleList: ''
        }
    }

    baseHandler = (event) => {
        this.setState({sample: {...this.state.sample, base: event.target.value}})
    }

    base2Handler = (event) => {
        this.setState({sample: {...this.state.sample, base2: event.target.value}})
    }

    sampleDateHandler = (event) => {
        this.setState({sample: {...this.state.sample, date: event.target.value}})
    }

    dataWrite = async () => {
        await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({sample: {...this.state.sample, course: response.rates[this.state.sample.base2]}})
            })

        await axios.post('https://rateapp-f16f6-default-rtdb.europe-west1.firebasedatabase.app/sample.json', this.state.sample)
            .then((response) => {
                return ('')
            })
        await axios('https://rateapp-f16f6-default-rtdb.europe-west1.firebasedatabase.app/sample.json')
            .then((response) => {
                this.setState({sampleList: response.data})
            })
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
                baseHandler: this.baseHandler,
                base2Handler: this.base2Handler,
                sampleDateHandler: this.sampleDateHandler,
                dataWrite: this.dataWrite
            }}>
                <Layout/>
            </RateContext.Provider>
        );
    }
}

export default App;
