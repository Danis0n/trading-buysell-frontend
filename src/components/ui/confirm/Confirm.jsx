import React from 'react'
import Button from '../button/Button'

const Confirm = ({handleCancel, handleItem, message}) => {

    const Message = {
        fontSize : '30px',
        marginBottom : '20px',
    }

    return (
        <div>
            <div style={Message}>
                {message}
            </div>
            <div style={{
                margin : '10px 30px',
            }}>
                <Button
                    style={{
                    padding : '5px 25px',
                    margin : 'auto 30px',
                    fontSize : '25px',
                    backgroundColor: 'white',
                    color: 'black',
                    }}
                    onClick={handleItem}
                >Да</Button>

                <Button
                    style={{
                    padding : '5px 25px',
                    fontSize : '25px',
                    }}
                    onClick={handleCancel}
                >
                    Нет
                </Button>
            </div>
        </div>
    )
}

export default Confirm