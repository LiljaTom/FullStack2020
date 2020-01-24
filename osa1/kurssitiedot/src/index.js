import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  
    return (
      <div>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
      </div>
    )
  }

const Header = (props) => {
    return(
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
  
    return(
      <div>
      <p>
        {props.parts[0].name} {props.parts[0].exercises}
      </p>
    <p>
      {props.parts[1].name} {props.parts[1].exercises}
    </p>
      <p>
      {props.parts[2].name} {props.parts[2].exercises}
    </p>
    </div>
    )
}

const Total = (props) => {
    return(
        <p>
            Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
        </p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))