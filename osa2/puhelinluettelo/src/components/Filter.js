import React from 'react'

const Filter = ({filterWord, handleFilterChange}) => {
    return(
        <div>
            filter <input value={filterWord} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter