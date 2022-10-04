import React from 'react'
import cl from './Select.module.css'

const PrecisionSelect = ({children, ...props}) => {
  return (
    <select {...props} className={cl.precision}>{children}</select>
  )
}

export default PrecisionSelect;