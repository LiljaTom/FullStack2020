import React from 'react'

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <ul>
            {course.parts.map(part => 
                <Content key={part.id} part={part}/>
            )}
            </ul>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({course}) => {
    return(
        <div>
            <h2>{course}</h2>
        </div>
    )
}

const Content = ({part}) => {
    return(
        <div>
            <li>
                {part.name} {part.exercises}
            </li>
        </div>
    )
}

const Total = ({parts}) => {  
    const total = parts.map(part => part.exercises).reduce((s,p) => s + p)

    return(
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

export default Course