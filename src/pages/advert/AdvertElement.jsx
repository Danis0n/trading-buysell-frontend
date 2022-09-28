import React from 'react'

const AdvertElement = (props) => {

    const style = {
        // todo : fill with style
        margin: '40px'
    };

  return (
    <div
     style={style} 
     key={props.advert.id}
    >
        {props.advert.id} {props.advert.title} {props.advert.type.name} 
        <img src={props.advert.images[0].url} width='200' height='200' alt='logo'/>
    </div>
  )
}

export default AdvertElement