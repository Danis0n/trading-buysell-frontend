import React from 'react'
import cl from './Hr.module.css'

const Hr = ({color}) => {
  return (
    <div className={cl.bottomLine}>
        <hr style={{background: color}}/>
    </div>
  )
}

export default Hr