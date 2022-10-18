import React from 'react'
import CommentService from '../../service/CommentService'
import Button from '../../components/ui/button/Button'
import Hr from '../../components/ui/hr/Hr'

const CommentElement = ({comment, userId}) => {

    const deleteComment = async (id) => {
        try {
            const response = await CommentService.delete(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitDelete = async (e) => {
        deleteComment(comment.id);
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
                     onClick={handleSubmitDelete}
                    >
                      Удалить
                    </Button>
                </div>
                :
                <></>
                }
            </div>
    </div>
    )
}

export default CommentElement