import React from 'react'
import Button from '../../../components/ui/button/Button'
import Textarea from '../../../components/ui/textarea/Textarea'

const NotifyUser = ({message, setMessage, handleSubmit, handleCancel, text}) => {
  return (
    <div>
        <div style={{
            margin: '20px 10px'
        }}>
            {text}
        </div>
        <Textarea
        rows={5}
        cols={40}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />

        <div style={{display: 'flex', gap: '1rem', marginRight: 'auto', marginLeft: '150px'}}>
            <Button
             onClick={() => handleSubmit()}
            >Подтвердить</Button>
            <Button
             onClick={handleCancel}
             style={{color: 'black', backgroundColor: 'white'}}
            >
                Отмена
            </Button>
        </div>
    </div>
  )
}

export default NotifyUser