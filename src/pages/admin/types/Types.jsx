import React, {useState, useEffect} from 'react'
import TypeElement from './TypeElement'
import AdvertService from '../../../service/AdvertService'
import Hr from '../../../components/ui/hr/Hr'
import Button from '../../../components/ui/button/Button'
import Modal from '../../../components/ui/modal/Modal'
import LoginForm from '../../../components/ui/login/LoginForm'
import CreateLocation from './CreateLocation'

const Types = () => {

    const [titleTypes] = useState([
        {name: 'auto'},
        {name: 'tech'},
        {name: 'property'},
        {name: 'study'},
    ])

    const [locationCreateModal, setLocationCreateModal] = useState(false)

    const [locations, setLocations] = useState([])

    const fetchLocations = async () => {
        try {
            const response = await AdvertService.getLocations();
            setLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchLocations();
    }, [])
    
    const style = {
        minWidth: '900px',
        padding: '25px 20px',
        margin: '20px 10px',
        boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
        borderRadius: '10px',
    }

    return (
        <div>
            {titleTypes.map(element => {
                return <TypeElement key={element.name} titleType={element.name}/>
            })}

            <div style={{
                fontSize: '30px'
            }}>
                Города
                <Hr/>
            </div>
            
            <div style={style}>   
                Количество - {locations.length}
                <Hr/>
                {locations.map(element => {
                    return <div key={element.name}>{element.name} - {element.description}</div>
                })}
                <Button onClick={() => setLocationCreateModal(true)}>Добавить</Button>
            </div>
            <Modal
                visible={locationCreateModal}
                setVisible={setLocationCreateModal}
            >
            <CreateLocation setModal={setLocationCreateModal}/>
            </Modal>

        </div>
    )
}

export default Types