import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterWord, setFilterWord] = useState('')
  const [ message, setMessage] = useState(null)
  const [ color, setColor] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
          setPersons(response.data)
      })

  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.filter(person => person.name === newName).map(person => person.id)
        
        personService
          .updateNumber(id, personObject)
          .then(response => {
            const updateId = id[0]
            setPersons(persons.map(person => person.id !== updateId ? person : response.data))  
            handleMessages(`Updated ${newName}`)
            setColor('green')
          })
          .catch(error=> {
            handleMessages(`Problem updating ${personObject.name}, no information found`)
            setColor('red')
          })
      }

    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          handleMessages(`Added ${newName}`)
          setColor('green')
        })
        .catch(error => {
          handleMessages(`Problem adding ${newName}`)
          setColor('red')
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  }

  const handlePersonDelete = (id) => {
    if(window.confirm(`Delete ${persons.filter(person => person.id === id)[0].name} ?`)) {
      personService.removePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          handleMessages(`Removed ${persons.filter(person => person.id === id).map(person => person.name)}`)
          setColor('green')
        })
        .catch(error => {

        })
    }
  }

  const handleMessages = (message) => {
    setMessage(
      message
    )
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }


  const personsToShow = (filterWord === '')
      ? persons
      : persons.filter(person => person.name.toUpperCase().includes(filterWord.toUpperCase()))

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <Filter filterWord={filterWord} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handlePersonDelete={handlePersonDelete}/>
    </div>
  )
}

export default App