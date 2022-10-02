import cl from './Dot.module.css'

const Dot = ({children}) => {
  return (
    <div className={cl.dot}>{children}</div>
  )
}

export default Dot