import React, {useState, useEffect} from 'react'
import AdvertService from '../../../service/AdvertService'
import Element from './Element'
import Button from '../../../components/ui/button/Button'
import CreateType from './CreateType'
import Modal from '../../../components/ui/modal/Modal'

const TypeElement = ({titleType}) => {

    const [main, setMain] = useState([])
    const [sub, setSub] = useState([])
    const [brand, setBrand] = useState([])

    const [typeModal, setTypeModal] = useState(false)

    const fetchBrand = async (titleType) => {
        try {
            const response = await AdvertService.getBrandTypeByTitleType(titleType);
            setBrand(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSub = async (titleType) => {
        try {
            const response = await AdvertService.getSubTypeByTitleType(titleType);
            setSub(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMain = async (titleType) => {
        try {
            const response = await AdvertService.getMainTypeByTitleType(titleType);
            setMain(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMain(titleType);
        fetchSub(titleType);
        fetchBrand(titleType);
    }, []);

    const style = {
        minWidth: '900px',
        padding: '25px 20px',
        margin: '20px 10px',
        boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
        borderRadius: '10px',
    }

  return (
    <div style={style}>
        <div style={{display: 'flex', gap: '2rem'}}>
            <Element type={main}/>
            <Element type={sub}/>
            <Element type={brand}/>
            <Button onClick={() => setTypeModal(true)}>Добавить</Button>
            <Modal
                visible={typeModal}
                setVisible={setTypeModal}
            >
            <CreateType setModal={setTypeModal} titleType={titleType}/>
            </Modal>
        </div>
    </div>
  )
}

export default TypeElement