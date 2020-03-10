import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'


const EditForm = ({ authors }) => {
    const firstAuthor = authors[0]

    const [name, setName ] = useState(firstAuthor.name)
    let [setBornTo, setSetBornTo] = useState('')

    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [ {query: ALL_AUTHORS }]
    })

    const submit = async(event) => {
        event.preventDefault()

        console.log('Updating author')
        console.log(name)
        setBornTo = parseInt(setBornTo)

        updateAuthor({ variables: {name, setBornTo }})

        setName(firstAuthor.name)
        setSetBornTo('')
    }


    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
            <label>
                <select value={name} onChange={({ target }) => setName(target.value)}>
                {authors.map(a => 
                  <option key={a.name} value={a.name} >{a.name}</option>  
                )}
                </select>
            </label>
            <div>
                born
                <input 
                value={setBornTo}
                onChange={({ target }) => setSetBornTo(target.value)}
                />
            </div>
            <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default EditForm