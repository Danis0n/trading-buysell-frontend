import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/button/Button';

const NotFoundPage = () => {

    const nav = useNavigate();

    const Error = {
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '100px',
    }

    const text = {
        fontSize: '40px',
        marginBottom: '20px',
        textAlign:  'center',
    }

    const helperText = {
        marginBottom: '20px',
        fontSize : '25px',
        textAlign: 'center',
    }

    const handleSubmit = (e) => {
        nav('/');
    }

  return (
    <div style={{
        height: '575px',
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
    }}>
        <div style={Error}>
            404
        </div>
        <div style={text}>
            Упс... Не найдено :(
        </div>
        <div style={helperText}>
            Вы оказались на несуществующей странице...
        </div>
        <div style={helperText}>
            <Button 
             style={{
             }}
             onClick={handleSubmit}>Назад</Button>
        </div>
    </div>
  )
}

export default NotFoundPage