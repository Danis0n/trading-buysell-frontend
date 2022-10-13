import React from 'react'

const Icon = ({image}) => {
  return (
    <div style={{
        display: 'inline-block',
        verticalAlign: 'top',
        width: '32.33%',
        maxWidth: '285px',
        textAlign: 'center',
        textAlignLast: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          width: '83px',
          height: '83px',
          margin: '0 auto 23px',
          borderRadius: '100%',
          border: '6px solid rgba(255, 255, 255, 0.2)',
        }}>
            <div style={{
              position: 'absolute',
              top: '13px',
              left: '0',
              bottom: '0',
              right: '2px',
              margin: 'auto',
            }}>
                <div style={{
                display: 'inline-block',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                width: '44px',
                height: '44px',
                }}>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Icon