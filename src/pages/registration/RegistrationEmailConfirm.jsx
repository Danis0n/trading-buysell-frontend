import React from 'react'
import { useSearchParams } from 'react-router-dom'

const RegistrationEmailConfirm = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{
        height: '575px',
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
    }}>
        <div style={{
            paddingTop: '200px',
            fontSize: '30px'
        }}>
        На вашу электронную почту {searchParams.get('email')} было отправлено Письмо c кодом подтверждения
        </div>
    </div>
  )
}

export default RegistrationEmailConfirm