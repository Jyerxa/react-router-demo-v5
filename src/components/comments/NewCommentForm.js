import {useEffect, useRef} from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from "../../hooks/use-http";
import {addComment} from "../../lib/api";

const NewCommentForm = (props) => {
    const {quoteId} = props;
    const {sendRequest: addNewComment, status } =useHttp(addComment);
    const commentTextRef = useRef();

    useEffect(() => {
        if(status ==='completed') {
            props.onCommentAdded();
        }
    }, [status]);


    const submitFormHandler = (event) => {
        event.preventDefault();
        // optional: Could validate here

        // send comment to server
        addNewComment({quoteId: quoteId, commentData: commentTextRef.current.value})
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control} onSubmit={submitFormHandler}>
                <label htmlFor='comment'>Your Comment</label>
                <textarea id='comment' rows='5' ref={commentTextRef}/>
            </div>
            <div className={classes.actions}>
                <button className='btn'>Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;
