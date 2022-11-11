import React, { useState, useEffect } from 'react'
import PasswordService from '../../service/PasswordService'
import Hr from '../../components/ui/hr/Hr'
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import { variants } from '../../router/props';

const PasswordRestore = () => {

    const Navigate = useNavigate();

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [haveCheck, setHaveCheck] = useState(true);
    const [isRestored, setIsRestored] = useState(false);
    const [isRestoredCheck, setIsRestoredCheck] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const checkEmail = async (email) => {
        if(email === '') return;
        try {
            const response = await PasswordService.isEmailValid(email);
            setIsEmailValid(response.data);
            setHaveCheck(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const restorePassword = async (email, username) => {
        if(username === '') return;
        try {
            const response = await PasswordService.restorePassword(email,username);
            setIsRestored(response.data);
            setIsRestoredCheck(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(isRestored)
            Navigate(`/restore/success?email=${email}`)
    }, [isRestored])

    return (
        <div style={{
            height: '575px',
            display: 'table',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <div style={{fontSize: '40px'}}>
                Восстановление пароля
                <Hr/>
            </div>

            <div style={{
                padding: '30px 60px',
                boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)'
            }}>
                <div>
                    {isEmailValid ?
                    <motion.div
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.4, type: 'easeInOut' }}
                    >
                        <div style={{marginBottom: "20px"}}>
                        Пожалуйста, укажите ваш логин.
                        </div>
                        <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '350px',
                            marginBottom: '20px'
                        }}
                        />
                        <Button onClick={() => restorePassword(email, username)}>Подтвердить</Button>
                        
                        <div style={{
                            color: 'red',
                            marginTop: '20px',
                        }}>
                        {isRestoredCheck ? 
                        <></>
                        :
                        <>Неверный логин</>
                        }
                        </div>

                    </motion.div>
                    :
                    <motion.div
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.4, type: 'easeInOut' }}
                    >
                        <div style={{marginBottom: "20px"}}>
                        Пожалуйста, укажите вашу эл. почту.
                        </div>
                        <Input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '350px',
                                marginBottom: '20px'
                            }}
                        />
                        <Button onClick={() => checkEmail(email)}>Подтвердить</Button>

                        <div style={{
                            color: 'red',
                            marginTop: '20px',
                        }}>
                        {haveCheck ? 
                        <></>
                        :
                        <>Почта не найдена</>
                        }
                        </div>

                    </motion.div>
                }
                </div>

            </div>

        </div>
    )
}

export default PasswordRestore