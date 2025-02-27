import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { BookContext } from "../context/books";

const Home = () => {
    const { featured } = useContext(BookContext);
    
    // Display a message if there are no featured books
    if (!featured.length) {
        return <h3>No Featured Books</h3>;
    }
    
    return (
        <>
            {/* Hero section with introductory banner */}
            <Hero />
            
            <section className="featured">
                <header className="featured-head">
                    <h3>Featured Collection</h3>
                </header>
                
                {/* Render the list of featured books */}
                <div className="books featured-list">
                    {featured.map(({ id, image, title }) => (
                        <article key={id} className="book featured-book">
                            <div className="book-image">
                                <img src={image} alt={title} />
                            </div>
                            <Link to={`books/${id}`} className="btn book-link">Details</Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;
