import {useEffect, useState} from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from "../../hooks/use-http";
import {getAllComments} from "../../lib/api";
import CommentsList from "./CommentsList";

const Comments = (props) => {
    const {quoteId} = props;
    const {sendRequest: getComments, status, data: comments} = useHttp(getAllComments, true);
    const [isAddingComment, setIsAddingComment] = useState(false);

    useEffect(() => {
        if(isAddingComment === false) {
            getComments(quoteId);
        }
    }, [getComments, quoteId, isAddingComment]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const onCommentAddedHandler = () => {
        setIsAddingComment(false);
    };

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}

            {isAddingComment && <NewCommentForm quoteId={quoteId} onCommentAdded={onCommentAddedHandler} />}
            {status === 'pending'}
            {comments && <CommentsList comments={comments}/> }
        </section>
    );
};

export default Comments;
