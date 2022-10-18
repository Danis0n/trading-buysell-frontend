import React, {useState} from 'react'
import { useAuth } from '../../components/hook/useAuth'
import CommentService from '../../service/CommentService'
import Input from '../../components/ui/input/Input'
import Textarea from '../../components/ui/textarea/Textarea'
import Button from '../../components/ui/button/Button'
import Hr from '../../components/ui/hr/Hr'

const CreateComment = ({id, myId}) => {

  const [userId, setUserId] = useState(id);
  const [myUserId, setMyUserId] = useState(myId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [advertName, setAdvertName] = useState('none');

  const create = async (id, myId, title, description, rating, advertName) => {
    try {
      const response = await CommentService.create(
        id,myId,advertName,
        title, description, rating
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    create(userId, myUserId, title, description, rating, advertName);
  }

  const inputStyle = {
    margin: '20px',
  }

  return (
    <div style={{
      padding: '30px',
      borderRadius: '5px',
      boxShadow: '0 0 16px rgb(109 109 109 / 25%)',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '50px',
      display: 'table',
    }}>
      
      <div
       style={{
        display: 'flex',
       }}
      >
        <div>
            Ваша оценка
            <Input
              style={inputStyle}
              type="text"
              value={rating}
              onChange={e => setRating(e.target.value)}
            />
        </div>

        <div>
            Тема
            <Input
              style={inputStyle}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
        </div>
      </div>

      Описание
      <div style={{
        marginTop: '20px',
      }}>
          <Textarea
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '900px',
              height: '100px',
            }}
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
      </div>

      <Button 
       onClick={handleSubmit}
      >
        Отправить
      </Button>

    </div>
  )
}

export default CreateComment