import React, { useState } from 'react';
import axios from 'axios';

const WishlistForm = () => {
    const [wishlist, setWishlist] = useState({ name: '', items: [] });
    const [item, setItem] = useState({ name: '', description: '', link: '', price: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/wishlist', wishlist);
            console.log('Wishlist created:', response.data);
        } catch (error) {
            console.error('Error creating wishlist:', error);
        }
    };

    const addItem = () => {
        setWishlist({ ...wishlist, items: [...wishlist.items, item] });
        setItem({ name: '', description: '', link: '', price: 0 });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Wishlist</h2>
            <input
                type="text"
                placeholder="Wishlist Name"
                value={wishlist.name}
                onChange={(e) => setWishlist({ ...wishlist, name: e.target.value })}
            />
            <h3>Add Items</h3>
            <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Item Link"
                value={item.link}
                onChange={(e) => setItem({ ...item, link: e.target.value })}
            />
            <button type="button" onClick={addItem}>Add Item</button>
            <button type="submit">Submit Wishlist</button>
        </form>
    );
};

export default WishlistForm;