import React from 'react'
import Input from '../../components/ui/input/Input'

const SmartInput = ({title, styleInput, set, value, placeholder, inputType}) => {

    const style = {
        display: 'flex',
        marginBottom: '40px',
    }

    const styleTitle = {
        textAlign: 'start',
        margin: '10px 20px 20px 0px'
    }

  return (
    <div style={style}>
        <div style={styleTitle}>
          {title}
        </div>
        <div>
          <Input 
            style={styleInput}
            type={inputType}
            value={value}
            onChange={e => set(e.target.value)}
            placeholder={placeholder}
            />
        </div>
      </div>
  )
}

export default SmartInput