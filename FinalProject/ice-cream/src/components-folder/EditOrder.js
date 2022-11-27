import React, { useContext } from 'react';
import OrderForm from './OrderForm';
import { useParams } from 'react-router-dom';
import OrdersContext from '../context-folder/OrdersContext';
import { useNavigate } from 'react-router-dom';



function EditOrder()  {
    const navigate = useNavigate();

    const { orders, setOrders } = useContext(OrdersContext);
    //useParams returns an object of key/value pairs of the dynamic params from current url that were matched by the route path
    const { id } = useParams();
    //find and edit an order based on their id
    const orderToEdit = orders.find((order) => order.id === id);
    console.log("orderToEdit: " + orderToEdit.mochi_quantity);

    //resubmits information based on users input
    const submitHandler = (order) => {
        const filteredOrders = orders.filter((order) => order.id !== id);
        setOrders([order, ...filteredOrders]);
        navigate('/');
    };

    return (
        <div>
            <OrderForm order={orderToEdit} submitHandler={submitHandler} />
        </div>
    );
};

export default EditOrder;