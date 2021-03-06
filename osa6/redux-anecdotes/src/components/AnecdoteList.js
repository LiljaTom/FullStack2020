import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return filter === '' ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
    })

    const vote = anecdote => {
        dispatch(likeAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
          {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => vote(anecdote)}
            />
          )}
        </div>
      )
}

export default AnecdoteList