import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishlistView = ({ wishlistId }) => {
    const [wishlist, setWishlist] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`/api/wishlist/${wishlistId}`);
                setWishlist(response.data);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlist();
    }, [wishlistId]);

    if (!wishlist) return <p>Loading...</p>;

    return (
        <div>
            <h2>{wishlist.name}</h2>
            <ul>
                {wishlist.items.map((item) => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">Buy</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WishlistView;