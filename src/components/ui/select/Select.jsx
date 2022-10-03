import React from 'react'
import cl from './Select.module.css'

const Select = ({children, ...props}) => {
  return (
    <select {...props} className={cl.form}>{children}</select>
  )
}

export default Select