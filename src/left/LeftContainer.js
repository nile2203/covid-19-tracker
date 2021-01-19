import React, { useEffect, useState } from 'react';
import Dropdown from '../components/dropdown/Dropdown';
import './LeftContainer.css';
import Aux from '../hoc/aux';
import Infobox from '../components/infobox/Infobox';
import LineGraph from '../components/graph/LineGraph';

export default function LeftContainer({ countries }) {
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [graphdata, setGraphData] = useState({});

    const getGraphDataForAllCountries = async () => {
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
            setGraphData(data)
            console.log(data)
        })
        .catch(error => console.log(error))
    }

    const getGraphDataForCountry = async (code) => {
        await fetch(`https://disease.sh/v3/covid-19/historical/${code}?lastdays=120`)
        .then(response => response.json())
        .then(data => {
            console.log(">>>>>>>>>>>>>>>>>", data)
            setGraphData(data)
        })
        .catch(error => console.log(error))
    }

    const getWorldWideStats = async () => {
        await fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data)
        })
        .catch(error => console.log(error))
    }

    const onCountryChange = async (event) => {
        const code = event.target.value;
        getGraphDataForCountry(code)
        const url = code === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : 
        `https://disease.sh/v3/covid-19/countries/${code}`;

        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
            setCountry(code);
        })
        .catch(error => console.log(error))
    }

    const getInfoboxes = () => {
        console.log(countryInfo)
        return (
            <Aux>
                <Infobox title="Coronavirus Cases" numberOfCases={countryInfo.todayCases} totalCases={countryInfo.cases}/>
                <Infobox title="Recovered Cases" numberOfCases={countryInfo.todayRecovered} totalCases={countryInfo.recovered}/>
                <Infobox title="Deaths" numberOfCases={countryInfo.todayDeaths} totalCases={countryInfo.deaths}/>
            </Aux>
        );
    }
    
    // run some code based on some condition in 2nd argument
    useEffect( () => {
        getGraphDataForAllCountries()
        getWorldWideStats()
    }, []);

    return (
        <div className="app__leftContainer">
            <Dropdown countries={countries} onCountryChange={onCountryChange} country={country}/>
            <div className="app__cards">
                {getInfoboxes()}
            </div>
            <LineGraph data={graphdata}/>
        </div>
    )
}
