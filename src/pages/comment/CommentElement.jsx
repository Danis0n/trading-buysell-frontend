import React, {useState} from 'react'
import CommentService from '../../service/CommentService'
import Button from '../../components/ui/button/Button'
import Hr from '../../components/ui/hr/Hr'
import Modal from '../../components/ui/modal/Modal'
import Confirm from '../../components/ui/confirm/Confirm'

const CommentElement = ({comment, userId}) => {

    const [confirmModal, setConfirmModal] = useState(false);

    const deleteComment = async (id) => {
        try {
            const response = await CommentService.delete(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        setConfirmModal(true);
    }

    const handleSubmitDelete = async () => {
        deleteComment(comment.id);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setConfirmModal(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setConfirmModal(false);
        handleSubmitDelete();
    }

    const styleElement = {
        width: '800px',
        padding: '30px',
        borderRadius: '5px',
        boxShadow: '0 0 16px rgb(109 109 109 / 25%)',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '50px',
        display: 'table',
    }

    const styleText = {
        marginTop: '20px',
        textAlign: 'justify',
        textIndent: '40px',
        marginBottom: '30px',
    }

    const alternativeButton = {
        background: 'white',
        color: 'black',
    }

    return (
        <div
         style={styleElement}
        >
            <div style={{display: 'flex'}}>
              Оценка :
              <div style={{marginLeft: '10px'}}>
                {comment.rating} баллов
              </div>
            </div>
            <div style={{display: 'flex'}}>
              Тема: 
             <div style={{marginLeft: '10px'}}>
               {comment.title}
             </div>
            </div>
            <Hr style={{
                margin: '0',
            }}/>
            <div style={styleText}>
             {comment.description}
            </div>
            <div>
                {(userId == comment.createdBy || userId == comment.to)
                ?
                <div
                 style={{
                    textAlign: 'right',
                 }}
                >
                    <Button
                     style={alternativeButton}
                     onClick={handleSubmit}
                    >
                      Удалить
                    </Button>

                    <Modal
                      visible={confirmModal}
                      setVisible={setConfirmModal}
                    >
                    <Confirm
                      handleItem={handleLogout}
                      handleCancel={handleCancel}
                      message={'Вы точно хотите удалить комментарий?'}
                    />
                </Modal>

                </div>
                :
                <></>
                }
            </div>
    </div>
    )
}

export default CommentElement