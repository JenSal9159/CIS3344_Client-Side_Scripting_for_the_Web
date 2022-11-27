import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

//a single order consists of id, ordername, cup-holder, mochi-quantity, scoops quantity, flavor, toppings, and date
const Order = ({
    id,
    ordername,
    holder,
    mochi_quantity,
    scoops_quantity,
    flavor,
    toppings,
    date,
    handleRemoveOrder
}) => {
    const history = useNavigate();

    return (
        <Card style={{ width: '20rem' }} className="order">
            <Card.Body>
                {/*Order Information*/}
                <Card.Title className="order-title">{ordername}</Card.Title>
                <div className="order-details">
                    <div>Holder: {holder}</div>
                    <div>Scoops_Quantity: {scoops_quantity} </div>
                    <div>Mochi_Quantity: {mochi_quantity} </div>
                    <div>Flavor: {flavor} </div>
                    <div>Toppings: {toppings} </div>
                    <div>Date: {new Date(date).toDateString()}</div>
                </div>
                {/*Button variants have to do with bootstrap styling*/}
                {/*Edit Button*/}
                <Button variant="primary" onClick={() => history(`/edit/${id}`)}>
                    Edit
                </Button>{' '}
                {/*Delete Button*/}
                <Button variant="danger" onClick={() => handleRemoveOrder(id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Order;