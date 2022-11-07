import React, {useState} from 'react'
import NotifyService from '../../service/NotifyService'
import Button from '../../components/ui/button/Button'

const NotificationElement = ({element}) => {

    const [isSeen, setIsSeen] = useState(element.seenByUser)

    const deleteById = async (id) => {
        try {
            const response = await NotifyService.deleteById(id);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally{
            window.location.reload();
        }
    }

    const setSeenById = async (id) => {
        try {
            const response = await NotifyService.setViewedById(id);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSeen = () => {
        if(element.seenByUser) return;
        setSeenById(element.id);
        setIsSeen(true);
    }

    const style = {
        maxWidth: '900px',
        padding: '10px 20px',
        margin: '20px 10px',
        boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
        borderRadius: '10px',
        backgroundColor: !isSeen ? '#FFF1C9' : 'white',
    }

    return (
        <div
         style={style}
         onMouseEnter={handleSeen} 
        >
            <div style={{
                margin: '10px',
            }}>
                Дата: {element.dateOfCreation.substring(0,10)}
            </div>
            <div style={{
                margin: '20px'
            }}>
                {element.message}
            </div>
            <div style={{
                marginLeft: '600px',
                marginRight: 'auto'
            }}>
                <Button
                 style={{
                   color: 'black',
                   backgroundColor: 'white' 
                 }}
                 onClick={() => deleteById(element.id)}
                >Удалить</Button>
            </div>
        </div>
    )
}

export default NotificationElement