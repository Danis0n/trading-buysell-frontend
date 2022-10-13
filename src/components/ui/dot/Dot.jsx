import cl from './Dot.module.css'

const Dot = ({children, style}) => {



  return (
    <div className={cl.dot} style={style}>{children}</div>
  )
}

export default Dot