import React from 'react'
import Button from '../../../components/ui/button/Button'
import Hr from '../../../components/ui/hr/Hr'

const Element = ({type}) => {
  return (
    <div style={{marginLeft: 'auto', marginRight: 'auto'}}>

        Количество - {type.length}
        <Hr/>

        <div>
        {type.map(element => {
            return <div key={element.name} style={{marginBottom: '5px'}}>{element.name} - {element.description}</div>
        })}
        </div>
    </div>
  )
}

export default Element