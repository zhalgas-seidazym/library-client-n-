import React, { useState } from 'react';
import api from '../api/axios';
import "../styles/comment.css"

const Comment = ({ comment, bookId, fetchComments, user }) => {
    const [content, setContent] = useState(comment.content);
    const [isEditing, setIsEditing] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('access');
            if (!token) {
                console.error("No access token found");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await api.put(`/api/books/${bookId}/comments/${comment.id}/`, { content }, config);
            fetchComments();
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('access');
            if (!token) {
                console.error("No access token found");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await api.delete(`/api/books/${bookId}/comments/${comment.id}/`, config);
            fetchComments();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleReply = async () => {
        try {
            const token = localStorage.getItem('access');
            if (!token) {
                console.error("No access token found");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await api.post(`/api/books/${bookId}/comments/`, { content: replyContent, parent: comment.id }, config);
            setReplyContent('');
            setShowReplyForm(false);
            fetchComments();
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="comment">
            <p>{comment.user}</p>
            {isEditing ? (
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            ) : (
                <p>{comment.content}</p>
            )}
            {user && user.email === comment.user && (
                <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
                    <span onClick={toggleDropdown}>⋮</span>
                    <div className="dropdown-content">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
            {isEditing && (
                <button onClick={handleUpdate}>Update</button>
            )}
            <div className="comment-footer">
                <button onClick={() => setShowReplyForm(!showReplyForm)}>
                    Reply
                </button>
            </div>
            {showReplyForm && (
                <div className="reply">
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                    />
                    <button onClick={handleReply}>Submit Reply</button>
                </div>
            )}
            <div className="replies">
                {(comment.replies || []).map(reply => (
                    <Comment key={reply.id} comment={reply} bookId={bookId} fetchComments={fetchComments} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Comment;
