import React from 'react'
import Country from './Country'

const Countries = ({countries, handleClick}) => {

    if(countries.length > 10) {
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    
    if(countries.length > 1) {
        return(
            <ul>
                {countries.map(country =>
                    <li key={country.name}>{country.name} <button onClick={() => handleClick(country.name)}>show</button></li>
                )}
            </ul>
        )
    }
    
    

    if(countries.length === 1) {
        return(
            <div>
                <Country country={countries[0]}/>
            </div>
        )
    }
    
    return(<p></p>)
}

export default Countries