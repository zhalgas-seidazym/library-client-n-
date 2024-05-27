import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/bookPage.css';
import api from "../api/axios";
import BookCard from "../components/BookCard";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await api.get(`api/books/?search=${searchQuery}&sort_by=${sortBy}`);
            setBooks(response.data);
        };
        fetchBooks();
    }, [searchQuery, sortBy]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (sortCriteria) => {
        setSortBy(sortCriteria);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setSearchQuery(event.target.value);
        }
    };

    return (
        <>
            <main>
                <div style={{position: "relative", top: "50px"}}>
                    <div className="book-searcher">
                        <input
                            type="text"
                            className="search-book-input"
                            placeholder="SEARCH BOOKS"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="sort-option-buttons">
                            <button className="sort-button" id="byDate" onClick={() => handleSortChange('date')}>BY DATE</button>
                            <button className="sort-button" id="byViews" onClick={() => handleSortChange('views')}>BY VIEWS</button>
                            <button className="sort-button" id="byRating" onClick={() => handleSortChange('rating')}>BY RATING</button>
                        </div>
                    </div>

                    <div className="books-body">
                        <div className="card-container" style={{width: '60%', margin: '40px auto'}}>
                            {books.map(b => (
                                <BookCard
                                    key={b.id}
                                    id={b.id}
                                    title={b.title}
                                    cover={b.cover}
                                    author={b.book_author}
                                    rating={b.rating}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
