import React, {useState} from 'react'

import { Link, useMatch } from 'react-router-dom'

const CustomLink = ({children, to, ...props}) => {

    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true);
    }
    
    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const match = useMatch({
      path: to,
      end: to.length === 1,
    });

    const LinkStyle = {
      color: match ? 'var(--color-active)' : 'black ',
      background: 'var(--color-bg)'
    }

  return (
    <Link
     to={to} 
     style={LinkStyle}
     {...props}
    >
        {children}
    </Link>
  )
}


export default CustomLink