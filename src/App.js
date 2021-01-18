import React, { useEffect, useState } from 'react';
import './App.css';
import LeftContainer from './left/LeftContainer';
import RightContainer from './right/RightContainer';

const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort( (a, b) => {
      if (a.cases > b.cases) {
          return -1;
      }
      else {
          return 1;
      }
  })
  return sortedData; 
}

function App() {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);

  const getCountries = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const countries = data.map( country => (
            {
                name: country.country,
                value: country.countryInfo.iso2
            }
        ));
        setTableData(sortData(data));
        setCountries(countries);
    })
    .catch(error => {
        console.log(error);
    })
  };

  useEffect( () => {
    getCountries()
  }, [])

  return (
    <div className="app">
      <LeftContainer countries={countries} />
      <RightContainer tableData={tableData} />
    </div>
  );
}

export default App;
