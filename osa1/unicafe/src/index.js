import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
    return(
    <button onClick={handleClick}>
        {text}
    </button>
    )
}

const StatisticLine = ({text, value}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const amount = good + neutral + bad
    const average = (good - bad) / amount
    const mean = good / amount * 100 + ' %'

    if(amount === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    } else {
        return(
            <div>
                <h1>statistics</h1>    
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad}/>
                    <StatisticLine text="all" value={amount}/>
                    <StatisticLine text="average" value={average}/>
                    <StatisticLine text="positive" value={mean}/>
                </tbody>
            </table>
            </div>
        )
    }

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)