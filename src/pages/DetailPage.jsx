import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../styles/detailPage.css';
import api, {isAuthenticated} from '../api/axios';
import CommentList from "../components/CommentList"; // Adjust the import path as necessary

const DetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [user, setUser] = useState(null);
    const [canRate, setCanRate] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!isAuthenticated()) {
                navigate('/login');
                return;
            }

            try {
                const [userResponse, bookResponse] = await Promise.all([
                    api.get('/api/users/profile/', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access')}`
                        }
                    }),
                    api.get(`/api/books/${id}/`)
                ]);

                const userData = userResponse.data;
                const bookData = bookResponse.data;

                setUser(userData);
                setBookData(bookData);

                const savedRating = localStorage.getItem(`rating-${userData.email}-${id}`);
                if (savedRating) {
                    setUserRating(parseInt(savedRating));
                }
                if (bookData.user === userData.email) {
                    setCanRate(false);
                }

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const calculateAverageRating = (rating) => {
        const totalRatings = rating['5'] + rating['4'] + rating['3'] + rating['2'] + rating['1'];
        if (totalRatings === 0) return 0;
        const weightedSum = rating['5'] * 5 + rating['4'] * 4 + rating['3'] * 3 + rating['2'] * 2 + rating['1'];
        return (weightedSum / totalRatings).toFixed(1);
    };

    const handleStarClick = async (rating) => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        if (userRating === rating) {
            // If the user clicks the same rating again, delete the rating
            setUserRating(0);
            localStorage.removeItem(`rating-${user.email}-${id}`);
            try {
                await api.delete(`/api/books/${id}/review/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`
                    }
                });
                // Fetch the updated book data to refresh the review bars
                const response = await api.get(`/api/books/${id}/`);
                setBookData(response.data);
            } catch (error) {
                console.error('Error deleting rating:', error);
            }
        } else {
            setUserRating(rating);
            localStorage.setItem(`rating-${user.email}-${id}`, rating); // Save the rating in local storage
            try {
                await api.post(`/api/books/${id}/review/`, {rating}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`
                    }
                });
                // Fetch the updated book data to refresh the review bars
                const response = await api.get(`/api/books/${id}/`);
                setBookData(response.data);
            } catch (error) {
                console.error('Error submitting rating:', error);
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error loading data</div>;
    }

    const {title, cover, description, book, rating, book_author} = bookData;
    const averageRating = calculateAverageRating(rating);

    return (
        <div className="container" style={{display: 'flex', flexDirection: 'column', marginTop: "30px"}}>
            <section>
                <div className="book-section">
                    <div className="book-cover">
                        <img src={cover} alt="Book Cover"/>
                    </div>
                    <div className="book-details">
                        <h1 className="book-title">{title}</h1>
                        <p className="book-author">by {book_author}</p>
                        <p className="book-description">{description}</p>
                        <div className="buttons">
                            <a href={book} target="_blank" rel="noopener noreferrer">
                                <button className="read-btn">Read</button>
                            </a>
                            <button className="favorites-btn">To Favorites</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="review-summary">
                        <h3>Review Summary</h3>
                        <div style={{display:"flex"}}>
                            <div className="review-bars">
                                <div className="bar"><span
                                    style={{width: `${(rating['5'] / rating.total) * 100}%`}}></span>
                                </div>
                                <div className="bar"><span
                                    style={{width: `${(rating['4'] / rating.total) * 100}%`}}></span>
                                </div>
                                <div className="bar"><span
                                    style={{width: `${(rating['3'] / rating.total) * 100}%`}}></span>
                                </div>
                                <div className="bar"><span
                                    style={{width: `${(rating['2'] / rating.total) * 100}%`}}></span>
                                </div>
                                <div className="bar"><span
                                    style={{width: `${(rating['1'] / rating.total) * 100}%`}}></span>
                                </div>
                            </div>
                            <div className="rating">
                                <h1>{averageRating}</h1>
                                {canRate ? (
                                    <div className="stars">
                                        {Array.from({length: 5}, (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleStarClick(index + 1)}
                                                className={index < userRating ? 'filled-star' : 'empty-star'}
                                                aria-label={`Rate ${index + 1} star`}
                                            >
                                                {index < userRating ? '★' : '☆'}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="cannot-rate">You cannot rate your own book</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="discussion">
                    <CommentList bookId={id} user={user}/>
                </div>
            </section>
        </div>
    );
};

export default DetailPage;
