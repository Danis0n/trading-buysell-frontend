import React from 'react'
import CommentService from '../../service/CommentService'

const CommentElement = ({comment, id}) => {

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

    return (
        <div>
            {comment.title}
            <br/>
            {comment.id}
            <br/>
            {comment.createdBy}
            <br/>
            {comment.to}
            <br />
            <button>edit</button>
            <br />
            <button onClick={handleSubmitDelete}>delete</button>
        </div>
    )
}

export default CommentElement