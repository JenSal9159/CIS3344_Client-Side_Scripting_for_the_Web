import React from 'react';
import { Link } from 'react-router-dom';

//Header Page containing one link to your order list and one link to create an order
const MainNavigationPage = () => {
    return (
        <header>
            <h1>Ice Cream Shop</h1>
            <hr />
            <div className="links">
                <Link to='/'>Order List</Link>
                <Link to='/add'>Create Order</Link>
            </div>
        </header>
    );
};

export default MainNavigationPage;