import React, { useContext } from 'react';
import OrderForm from './OrderForm';
import OrdersContext from '../context-folder/OrdersContext';
import { useNavigate } from 'react-router-dom';

//used in App
//used in OrderForm
function AddOrder() {
    //returns imperative method for changing the location
    const navigate = useNavigate();

    //useContext hook is used to create common data that can be accesed throughout component hierarchy without passing props down manually
    //at each level
    const { orders, setOrders } = useContext(OrdersContext);

    const submitHandler = (order) => {
        //...orders: spread operator: allows us to quickly copy all/part of an existing array into another array/object
        setOrders([order, ...orders]);
        navigate('/');
    };

    return (
        /* <> and </>React fragments allow you to wrap/ group multiple elements without adding extra node to DOM
         Useful when rendering multiple chil elements into a single parent component*/
        <>
            <OrderForm submitHandler={submitHandler} />
        </>
    );
};

export default AddOrder;