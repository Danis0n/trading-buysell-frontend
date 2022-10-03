import React from 'react'
import cl from './Textarea.module.css'

const Textarea = ({children, cols, rows, name}) => {
  return (
    <textarea className={cl.form} cols={cols} rows={rows} name={name}></textarea>
  )
}

export default Textarea