import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core'
import './Dropdown.css';


export default function Dropdown({ country, onCountryChange, countries }) {
    const getCountryMenuItem = (countries) => {
        if (country === undefined) {
            return [];
        }
        return countries.map(country => {
          return <MenuItem value={country.value}> {country.name} </MenuItem>
        })
    };

    return (
        <div className="app__header">
            <h1> COVID-19 TRACKER</h1>
            <FormControl className="dropdown">
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                    <MenuItem value="worldwide"> World Wide </MenuItem>
                    {getCountryMenuItem(countries)}
                </Select>
            </FormControl>
        </div>
    )
}
