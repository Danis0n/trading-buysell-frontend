import React, {useState} from 'react'
import Input from '../../components/ui/input/Input'

const CheckboxFilter = ({array, nameArray, handler}) => {

  const [isEnter, setIsEnter] = useState(false);

  const handleEnter = () => {
    setIsEnter(true);
  }

  const handleLeave = () => {
    setIsEnter(false)
  }

  return (
    <div style={{
        padding: '20px 10px',
        margin: '10px'
    }}>
        {array.map((element) => (
        <div
         key={element.name} 
         style={{
            display: 'flex',
            marginBottom: '5px'
         }}>
          <input
           onMouseEnter={handleEnter}
           onMouseLeave={handleLeave}
           style={{
            marginRight: '10px',
            cursor: isEnter ? 'pointer' : 'none',
            borderRadius: '20px',
           }}
           type='checkbox' 
           disabled={!nameArray.includes(element.name)} 
           onChange={()=> handler(element.name)}
          />
          <div>
          {element.description}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CheckboxFilter