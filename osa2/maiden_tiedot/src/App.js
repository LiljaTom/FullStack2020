import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'


const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleClick = (name) => {
        setFilter(name)
    }

    const countriesToShow = (filter.length > 0)
            ? countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
            : []

    

    return(
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <Countries countries={countriesToShow} handleClick={handleClick}/>
        </div>
    )
}


export default App