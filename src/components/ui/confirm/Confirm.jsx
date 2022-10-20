import React from 'react'
import Button from '../button/Button'
import CustomLink from '../link/CustomLink'

const Confirm = ({handleCancel, handleItem, message, link}) => {

    const Message = {
        fontSize : '20px',
        marginBottom : '20px',
    }

    const button = {
        padding : '5px 25px',
        margin : 'auto 30px',
        fontSize : '20px',
        backgroundColor: 'white',
        color: 'black',
    }

    return (
        <div>
            <div style={Message}>
                {message}
            </div>
            <div style={{
                margin : '10px 30px',
            }}>
                {link
                ?
                <a onClick={() => {window.location.href=link}}>
                    <Button
                    style={button}
                    onClick={handleItem}
                    >
                        Да
                    </Button>
                </a>
                :
                <Button
                    style={button}
                    onClick={handleItem}
                >
                    Да
                </Button>
                }

                <Button
                    style={{
                    padding : '5px 25px',
                    fontSize : '20px',
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