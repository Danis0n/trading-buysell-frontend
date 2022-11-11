import React from 'react'
import Select from './ui/select/Select';

const SmartSelect = ({array, style, value, defaultValue, set, defaultName}) => {
  return (
    <div>
        <Select style={style} value={value} onChange={(e) => set(e.target.value)}>
            <option disabled defaultValue value={defaultValue}>{defaultName}</option>
            {array.map(element => {
                return <option key={element.name} value={element.name}>{element.description}</option>
            })}
        </Select>
    </div>
  )
}

export default SmartSelect