import React, {useEffect, useState} from 'react';
import api from '../api/axios';
import Comment from './Comment';
import "../styles/commentList.css";

const CommentList = ({bookId, user}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const fetchComments = async () => {
        try {
            const response = await api.get(`/api/books/${bookId}/comments/`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [bookId]);

    const handleCreate = async () => {
        try {
            await api.post(`/api/books/${bookId}/comments/`, {content: newComment}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <>
            <div className="discussion-container">
                <h3>Discussion</h3>
                <textarea
                    className="discussion-textarea"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button className="discussion-button" onClick={handleCreate}>
                    Submit
                </button>
            </div>
            <div className="comment-list">
                <div>
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment} bookId={bookId} fetchComments={fetchComments}
                                 user={user}/>
                    ))}
                </div>
            </div>
        </>

    );
};

export default CommentList;
