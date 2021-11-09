import React, { useState, useEffect } from 'react'
import TeslaCar from '../components/TeslaCar/TeslaCar'
import TeslaNotice from '../components/TeslaNotice/TeslaNotice'
import TeslaStats from '../components/TeslaStats/TeslaStats'
import './TeslaBattery.css'
import { getModelData } from '../services/BatteryService';
import TeslaCounter from '../components/TeslaCounter/TeslaCounter'
import TeslaClimate from '../components/TeslaClimate/TeslaClimate'
import TeslaWheels from '../components/TeslaWheels/TeslaWheels'

function TeslaBattery(props) {

    const [carStats, setCarStats] = useState([])
    // const [speed, setSpeed] = useState(55)
    // const [climate, setClimate] = useState(true)
    // const [wheels, setWheels] = useState(19)
    // const [temperature, setTemperature] = useState(20)
    const [myConfig, setMyConfig] = useState({
        config: {
            speed: 55,
            temperature: 20,
            climate: true,
            wheels: 19
        }
    })


    function calculateStats(models, value) {
        const dataModels = getModelData();
        return models.map(model => {
            // ES6 Object destructuring Syntax,
            // takes out required values and create references to them
            const { speed, temperature, climate, wheels } = value;
            const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
            return {
                model,
                miles
            };
        });
    }



    // calculateStats = calculateStats.bind(this);
    // statsUpdate = statsUpdate.bind(this);

    //experiment

    function decrement(e, title) {
        e.preventDefault();
        let currentValue, minValue, step;
        const { speed, temperature } = props.counterDefaultVal;
        if (title === 'Speed') {
            currentValue = myConfig.config.speed;
            minValue = speed.min;
            step = speed.step;
        } else {
            currentValue = myConfig.config.temperature;
            minValue = temperature.min;
            step = temperature.step;
        }
        if (currentValue > minValue) {
            const newValue = currentValue - step;
            updateCounterState(title, newValue);
        }
    }

    function updateCounterState(title, newValue) {
        const config = { ...myConfig.config };
        // update config state with new value
        title === 'Speed' ? config['speed'] = newValue : config['temperature'] = newValue;
        // update our state
        // this.setState({ config });
        setMyConfig({ config })
    }

    function increment(e, title) {
        e.preventDefault();
        let currentValue, maxValue, step;
        const { speed, temperature } = props.counterDefaultVal;
        if (title === 'Speed') {
            currentValue = myConfig.config.speed;
            maxValue = speed.max;
            step = speed.step;
        } else {
            currentValue = myConfig.config.temperature;
            maxValue = temperature.max;
            step = temperature.step;
        }
        if (currentValue < maxValue) {
            const newValue = currentValue + step;
            updateCounterState(title, newValue);
        }
    }
    //Tesla Climate
    function handleChangeClimate() {
        const config = { ...myConfig.config };
        config['climate'] = !myConfig.config.climate;
        setMyConfig({ config })
    }

    //Tesla Wheel
    function handleChangeWheels(size) {
        const config = { ...myConfig.config };
        config['wheels'] = size;
        setMyConfig({ config })
    }

    useEffect(() => {
        function statsUpdate() {
            const carModels = ['60', '60D', '75', '75D', '90D', 'P100D'];
            // Fetch model info from BatteryService and calculate then update state
            setCarStats(calculateStats(carModels, myConfig.config))
        }
        statsUpdate()
    }, [myConfig])

    
    return (
        <form className="tesla-battery">
            <h1>Range Per Charge</h1>
            <TeslaCar wheelsize={myConfig.config.wheels} />
            <TeslaStats carstats={carStats} />
            <div className="tesla-controls cf">
                <TeslaCounter
                    currentValue={myConfig.config.speed}
                    initValues={props.counterDefaultVal.speed}
                    increment={increment}
                    decrement={decrement}
                />
                <div className="tesla-climate-container cf">
                    <TeslaCounter
                        currentValue={myConfig.config.temperature}
                        initValues={props.counterDefaultVal.temperature}
                        increment={increment}
                        decrement={decrement}
                    />
                    <TeslaClimate
                        value={myConfig.config.climate}
                        limit={myConfig.config.temperature > 10}
                        handleChangeClimate={handleChangeClimate}
                    />
                </div>
                <TeslaWheels
                    value={myConfig.config.wheels}
                    handleChangeWheels={handleChangeWheels}
                />
            </div>
            <TeslaNotice />
        </form>
    )
}

export default TeslaBattery
