import React from 'react'
import cl from './Input.module.css'

const Input = ({children, ...props}) => {
  return (
    <div>
      <input {...props} className={cl.form}/>
    </div>
  )
}

export default Input