import React from 'react'
import cl from './Input.module.css'

const Input = ({children, ...props}) => {
  return (
    <div >
      <label>
        <input {...props} className={cl.form}/>
      </label>
    </div>
  )
}

export default Input