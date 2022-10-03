import React from 'react'
import cl from './Select.module.css'

const Select = ({children}) => {
  return (
    <select className={cl.form}>{children}</select>
  )
}

export default Select