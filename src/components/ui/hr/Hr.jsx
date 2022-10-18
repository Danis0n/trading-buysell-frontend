import React from 'react'
import cl from './Hr.module.css'

const Hr = ({color, style}) => {
  return (
    <div className={cl.bottomLine} style={style}>
        <hr style={{background: color}}/>
    </div>
  )
}

export default Hr