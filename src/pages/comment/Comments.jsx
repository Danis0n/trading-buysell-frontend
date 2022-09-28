import React, {useState, useEffect} from 'react'
import CommentService  from '../../service/CommentService';
import CommentElement from './CommentElement';

const Comments = ({id, userId}) => {

    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const fetchComments = async (id) => {
        setLoading(true);
        try {
            const response = await CommentService.fetchAll(id);
            setComments(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    } 
    
    useEffect(() => {
        fetchComments(id);
    }, [])
    
    if(loading){
        return <div>Loading</div>
    }

    return (
        <div>
            Comments:
            {comments?.map((comment) => {
                return (
                    <div key={comment.id}>
                        <CommentElement comment={comment} id={userId}/>
                        <br/>
                    </div>
                )
            })}

            <br/>
        </div>
    )
}

export default Comments