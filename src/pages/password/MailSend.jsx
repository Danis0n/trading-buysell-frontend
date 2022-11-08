import React from 'react'
import { useSearchParams } from 'react-router-dom';
// mail was send to your email-box, check there

const MailSend = () => {

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
            Письмо было отправлено на почтовый ящик {searchParams.get('email')}
            </div>
        </div>
    )
}

export default MailSend