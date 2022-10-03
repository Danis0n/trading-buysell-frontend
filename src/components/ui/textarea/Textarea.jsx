import React from 'react'
import cl from './Textarea.module.css'

const Textarea = ({children, ...props}) => {
  return (
    <textarea className={cl.form} {...props}></textarea>
  )
}

export default Textarea