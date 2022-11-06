import React from 'react'
import Select from '../../components/ui/select/Select';

const SmartSelect = ({array, style, value, defaultValue, set}) => {
  return (
    <div>
        <Select style={style} value={value} onChange={(e) => set(e.target.value)}>
            <option disabled defaultValue value={defaultValue}>Выберете категорию</option>
            {array.map(element => {
                return <option key={element.name} value={element.name}>{element.description}</option>
            })}
        </Select>
    </div>
  )
}

export default SmartSelect