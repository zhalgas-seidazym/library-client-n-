import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../styles/bookPage.css';

class BookCard extends React.Component {
    renderStars(rating) {
        return [...Array(5)].map((star, index) => (
            <svg
                key={index}
                height="12px"
                width="12px"
                viewBox="0 0 47.94 47.94"
                xmlns="http://www.w3.org/2000/svg"
                className="star"
            >
                <path
                    d="M23.97 0l7.04 14.29 15.79 2.3-11.41 11.13 2.69 15.7-14.11-7.43-14.11 7.43 2.69-15.7-11.41-11.13 15.79-2.3L23.97 0z"
                    style={{fill: index < rating ? "#ED8A19" : "#ddd"}}
                />
            </svg>
        ));
    }
    componentDidMount() {
        const cards = document.querySelectorAll('.card');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }
    render() {

        const {id, title, cover, author, rating} = this.props;
        return (
            <div className="card" data-category="cabaret" data-date="2024-06-30">
                <div className="card-inner">
                    <div className="card-front">
                        <img src={cover || "images/noPhotoAvailable.jpeg"} alt={title} className="book-cover"/>
                        <div className="age">{rating.toFixed(1)}+</div>
                        <h3>{title}</h3>
                        <p>Author <br/> <strong style={{fontSize:"11px"}}>{author}</strong></p>
                    </div>
                    <div className="card-back">
                        <h3>More Info</h3>
                        <p>Details about the book...</p>
                        <Link to={`/book/${id}`} className="book-link">
                            <button>More Details</button>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}

BookCard.propTypes = {
    id: PropTypes.string.isRequired,
    title:
    PropTypes.string.isRequired,
    cover:
    PropTypes.string,
    author:
    PropTypes.string.isRequired,
    rating:
    PropTypes.number.isRequired
};

export default BookCard;
