import React, {useState} from 'react'
import { useAuth } from '../../components/hook/useAuth'
import CommentService from '../../service/CommentService'

const CreateComment = ({id, myId}) => {

  const {store} = useAuth();

  const [userId, setUserId] = useState(id)
  const [myUserId, setMyUserId] = useState(myId)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState('')
  const [advertName, setAdvertName] = useState('')

  const create = async (id, myId, title, description, rating, advertName) => {
    try {
      const response = await CommentService.create(id,myId,advertName,
                                                  title, description, rating);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    create(userId, myUserId, title, description, rating, advertName);
    // todo fill it wit code
  }

  return (
    <div>
      <div>
        <label>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='title'
          />
        </label>
      </div>

      <div>
        <label>
          Description
          <br />
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='title'
          />
        </label>
      </div>
      <div>
        <label>
          Rating
          <br />
          <input
            type="text"
            value={rating}
            onChange={e => setRating(e.target.value)}
            placeholder='title'
          />
        </label>
      </div>
      <div>
        <label>
          Title
          <br />
          <input
            type="text"
            value={advertName}
            onChange={e => setAdvertName(e.target.value)}
            placeholder='title'
          />
        </label>
      </div>

      <button onClick={handleSubmit}>submit</button>

    </div>
  )
}

export default CreateComment