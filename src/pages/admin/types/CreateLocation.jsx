import React,{useState} from 'react'
import Button from '../../../components/ui/button/Button'
import Hr from '../../../components/ui/hr/Hr'
import Input from '../../../components/ui/input/Input'
import AdminService from '../../../service/AdminService'

const CreateLocation = ({setModal}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = () => {
        if(name.length <= 30 && description.length <= 50) {
            createLocation(getJson(name,description))
            setModal(false);
            window.location.reload();
        }
    }

    const createLocation = async (json) => {
        try {
            const response = await AdminService.addNewType('location',json);
        } catch (error) {
            console.log(error);
        }
    }

    const getJson = (name, description) => {
        return JSON.stringify({
            type : "loc",
            name : name,
            description: description
        })
    }

  return (
    <div style={{
        width: '500px'
    }}>
        Окно создания
        <Hr/>

        <div>
        Название местоположения
        <Input
         style={{
            width: '300px',
            margin: '20px'
         }}
         text='text'
         placeholder='Не более 30 символов'
         value={name}
         onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div>
        Описание местоположения
        <Input
         style={{
            width: '300px',
            margin: '20px'
         }}
         text='text'
         placeholder='Не более 50 символов'
         value={description}
         onChange={(e) => setDescription(e.target.value)}
        />
        </div>

        <Button onClick={() => handleSubmit()}>Создать</Button>

    </div>
  )
}

export default CreateLocation