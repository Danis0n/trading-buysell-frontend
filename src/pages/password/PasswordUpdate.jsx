import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import PasswordService from '../../service/PasswordService';
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import { useNavigate } from 'react-router-dom';

// updates password 
const PasswordUpdate = () => {

    const Navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState(searchParams.get('token'))

    const [passwordEquals, setPasswordEquals] = useState()
    const [isSuccess, setIsSuccess] = useState('');

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const passwordUpdate = async (token, password) => {
        try {
            const response = await PasswordService.updatePassword(token,password);
            setIsSuccess(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePasswords = (password, passwordRepeat) => {
        setPasswordEquals(password === passwordRepeat)
        return password.length >= 8 && password === passwordRepeat;
    } 

    const handleSubmit = (password, passwordRepeat) => {
        if(handlePasswords(password,passwordRepeat))
            passwordUpdate(token, password);
    }

    useEffect(() => {
        if(isSuccess == 'Success')
            Navigate('/password/update/success')
    }, [isSuccess])

    return (
        <div style={{
            height: '575px',
            display: 'table',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <div style={{
                marginTop: '100px',
                boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
                padding: '50px',
                borderRadius: '20px'
            }}>
                <div style={{marginBottom: "20px"}}>
                Пожалуйста, укажите новый пароль.
                </div>
                <Input
                    placeholder='Новый пароль'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '350px',
                        marginBottom: '20px'
                    }}
                />
                <Input
                    placeholder='Повторите пароль'
                    type="password"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    style={{
                        width: '350px',
                        marginBottom: '20px'
                    }}
                />

                {passwordEquals ?
                <></>
                :
                <div style={{
                    color: 'red',
                    marginBottom: '20px' 
                }}>Пароли не совпадают!</div>
                }

                <Button onClick={() => handleSubmit(password, passwordRepeat)} >Подтвердить</Button> 
            </div>
        </div>
    )
}

export default PasswordUpdate