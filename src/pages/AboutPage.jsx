import React from 'react'
import cl from '../styles/about/About.module.css'
import Hr from '../components/ui/hr/Hr'
import Input from '../components/ui/input/Input'
import Textarea from '../components/ui/textarea/Textarea'
import Button from '../components/ui/button/Button'

const AboutPage = () => {

  const About = {
    textAlign: 'center',
    padding: '0 0 22px',
    fontSize: '40px',
  }

  const style = {
    width: '80%',
    margin : '20px'
  }

  const titleWord = {
    marginBottom : '10px'
  }

  const feedBackContacts = {
    display : 'flex',
  }

  const feedBackInputs = {
    width : '200px',
    // marginLeft: '10px',
    // marginRight: '10px',
    margin: '30px',
    marginBottom: '20px'
  }

  return (
    <div
     style={{
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
     }}
    >
      <div style={About}>
        Связаться с нами
        <Hr/>
      </div>

      <div className={cl.form}>
        <div style={titleWord}>
          Тема
        </div>
        <Input
          style={style}
          type='text'
          placeholder='Тема'
        />

        <div style={titleWord}>
          Сообщение
        </div>
        <Textarea
         style={style} 
         name='text' 
         rows={5}
         placeholder='Детальное описание'
        />

        <div style={feedBackContacts}>
          <Input
            style={feedBackInputs}
            type='text'
            placeholder='Имя'
          />
          <Input
            style={feedBackInputs}
            type='text'
            placeholder='Ваш E-mail'
          />
        </div>
        <Button>Отправить</Button>
      </div>
    </div>
  )
}

export default AboutPage