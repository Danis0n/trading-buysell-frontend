import React from 'react'

const AdvertElement = ({a}) => {

    const style = {
        // todo : fill with style
        margin: '40px'
    };

  return (
    <div
     style={style} 
     key={a.id}
    >
        {a.id} {a.title} {a.type.name} 
        <img src={a.images[0].url} alt='logo'/>
    </div>
  )
}

export default AdvertElement