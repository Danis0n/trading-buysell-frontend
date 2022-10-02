import React from 'react'
import cl from './Paragraph.module.css'

const Paragraph = ({children, ...props}) => {
  return (
    <div className={cl.paragraph}>{children}</div>
  )
}

export default Paragraph