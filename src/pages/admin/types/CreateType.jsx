import React, {useState} from 'react'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'
import AdminService from '../../../service/AdminService'
import Hr from '../../../components/ui/hr/Hr'
import SmartSelect from '../../../components/SmartSelect'

const CreateType = ({setModal, titleType}) => {
    
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')

  const handleSubmit = () => {
      if(name.length <= 30 && description.length <= 50) {
          createType(getJson(type,name,description), titleType)
          setModal(false);
          window.location.reload()
      }
  }

  const createType = async (json, titleType) => {
      try {
          const response = await AdminService.addNewType(titleType,json);
          console.log(response);
      } catch (error) {
          console.log(error);
      }
  }

  const getJson = (type, name, description) => {
      return JSON.stringify({
          type : type,
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
          Тип
          <SmartSelect
           array={[
            {name: "main", description: "Main"},
            {name: "sub", description: "Sub"},
            {name: "brand", description: "Brand"},
           ]}
           style={{width: '300px'}}
           value={type}
           set={setType}
           defaultValue=''
           defaultName={'Выберете категорию'}
          />
        </div>

        <div>
        Название
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
        Описание
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

export default CreateType