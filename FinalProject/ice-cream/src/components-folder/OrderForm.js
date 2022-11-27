import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
//Uuid v4 is a React library or package that creates a universally unique identifier (UUID).
//It is a 128 - bit unique identifier generator.
import { v4 as uuidv4 } from 'uuid';
import Multiselect from 'multiselect-react-dropdown';

//define a state as an object to store details
const OrderForm = (props) => {
    const [order, setOrder] = useState(() => {
        return {
            //use the ternary operator "?" to see if order property has been passed in or not by the user
            //if order property has been passed in, the property's value becomes the order value, else it becomes ''
            ordername: props.order ? props.order.ordername : '',
            holder: props.order ? props.order.holder : '',
            scoops_quantity: props.order ? props.order.scoops_quantity : '',
            mochi_quantity: props.order ? props.order.mochi_quantity : '',
            flavor: props.order ? props.order.flavor : '',
            toppings: props.order ? props.order.toppings : '',
            date: props.order ? props.order.date : ''
        };
    });

    //display error message if field is missing or has been skipped over
    //use useState to check whether or not an field is missing
    const [whoopsie, setWhoopsie] = useState('');
    //ES6 destructuring syntax- it unpacks values from arrays/ properties from objects into distinct variables
    const { ordername, holder, mochi_quantity, scoops_quantity, flavor, toppings } = order;

    //when user submits, checks if all inputs are filled- depending on whether they are or not, either stores
    //properties in an order or sends error message to the page
    const submitHandler = (event) => {
        event.preventDefault();
        const values = [ordername, holder, mochi_quantity, scoops_quantity, flavor, toppings];
        let whoopsie = '';
        const completeFields =
            values.every((field) => {
                const value = `${field}`.trim();
                //!== is a strict inequality operator- returns a boolean result
                //returns true if all fields have a value not equal to ''
                //handle errors
                return value !== ''
                    && value !== "Choose an Ice-Cream Holder!"
                    && value !== "Choose Number of Scoops!"
                    && value !== "choose Number of Mochi!"
                    && value !== "Select from our Flavors Menu!"
            });
        //if completeFields is true, create an order out of the fields
        if (completeFields) {
            const order = {
                id: uuidv4(),
                ordername,
                holder,
                mochi_quantity,
                scoops_quantity,
                flavor,
                toppings,
                date: new Date()
            };

            //Declared in AddOrder.js- navigates back to home page showing list of orders when button is clicked
            props.submitHandler(order);
        }
        else { whoopsie = 'Gotta fill out all dem fields lad'; }

        setWhoopsie(whoopsie);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("name " + name);
        console.log("value " + value);

        switch (name) {
            case 'scoops_quantity':
                if (value === '' || parseInt(value) === +value) {
                    setOrder((priorState) => ({...priorState, [name]: value}));
                }
                break;

            default:
                setOrder((priorState) => ({...priorState, [name]: value }));
            }
    };

    const onToppingsUpdate = (event) => {
        console.log(event);
        setOrder((priorState) => ({...priorState, ["toppings"]: event }));
    }

    return (
        <div className="main-form">
            {/*if whoopsie contains text, print the text*/}
            {whoopsie && <p className="whoopsie">{whoopsie}</p>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Order Name</Form.Label>
                    {/*<Form.Control- renders form control with Bootstrap stylying*/}
                    {/*value = {} IS SUPER IMPORTANT- when want to edit, it adds the data */}
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="ordername"
                        value={ordername}
                        placeholder="Enter name of ice-cream order"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="holder">
                    <Form.Label>Holder</Form.Label>
                    <Form.Control as="select" custom onChange={handleInputChange} name="holder" value={holder} >
                        <option disabled={true} value="" selected>Choose an Ice-Cream Holder!</option>
                        <option value="Cone">Cone</option>
                        <option value="Cup">Cup</option>
                        <option value="Bowl">Bowl</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="scoops_quantity">
                    <Form.Label>Scoops #</Form.Label>
                    <Form.Control as="select" custom onChange={handleInputChange} name="scoops_quantity" value={scoops_quantity}>
                        <option disabled={true} value="" selected>Choose Number of Scoops!</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="mochi_quantity">
                    <Form.Label>Mochi #</Form.Label>
                    <Form.Control as="select" custom onChange={handleInputChange} name="mochi_quantity" value={mochi_quantity}>
                        <option disabled={true} value="" selected>Choose Number of Mochi!</option>
                        <option value="0">0</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="flavor">
                    <Form.Label>Flavor</Form.Label>
                    <Form.Control as="select" custom onChange={handleInputChange} name="flavor" value={flavor}>
                        <option>Select from our Flavors Menu!</option>
                        <option value="Vanilla">Vanilla</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Coffee">Coffee</option>
                        <option value="Strawberry">Strawberry</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="toppings">
                    <Form.Label>Toppings</Form.Label>
                    <Multiselect
                        isObject={false}
                        onSelect={onToppingsUpdate}
                        onRemove={onToppingsUpdate}
                        selectedValues={toppings}
                        options={[
                            'Chocolate chips |',
                            'M&M |',
                            'Pepperoni |',
                            'Sprinkles |',
                            'Marshmallows |',
                            'Sour patch kids |',
                            'Mini hot dog |',
                            'Mini soft pretzels |',
                            'French fries |',
                            'Mango popping boba |',
                            'Strawberry popping boba |',
                            'Raspberry popping boba |',
                            'Red pepper Spice |',
                            'Oreo |'
                        ]}
                    />

                </Form.Group>
                <Button variant="primary" type="submit" className="submit-btn">Submit</Button>
            </Form>
        </div>
    );
};

export default OrderForm;