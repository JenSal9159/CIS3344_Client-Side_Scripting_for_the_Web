import React, { useContext, useState } from 'react';
import _ from 'lodash';
import Order from './Order';
import OrdersContext from '../context-folder/OrdersContext';

const OrdersList = () => {
    const { orders, setOrders } = useContext(OrdersContext);

    //delete order
    const handleRemoveOrder = (id) => {
        setOrders(orders.filter((order) => order.id !== id));
        //setSelection(orders.filter((order) => order.id !== id));
        //setSelection(selection, []);
        console.log("selection: " + selection);
        removeSelection();
    };

    /*  let handleOrderChange = (e) => {
        setOrders(e.target.value);
        console.log("ORDERS " + orders);
    }*/

    const [selection, setSelection] = useState([]);

    //checks if selection array contains the item, if it doesn't it adds it
    function handleOnClick(order) {
        //if (!selection.some(current => current.id === order.id)) {
        setSelection(selection, []);
            setSelection([order]);
            console.log("selection" + selection);   
    }

    function removeSelection() {
        setSelection([]);
    }
    
    return (
        <React.Fragment>
            <p className="message">Orders!</p>

            <div className="order-options">
                    {orders.map(order => (
                        <span key={order.id}>
                            <button type="button" onClick={() => handleOnClick(order)}>
                                <span>{order.value}</span>
                                <span> {order.ordername} </span>

                            </button>
                        </span>
                        ))}
                {/*
                 <select value={orders}
                    onChange={handleOnClick}  value={orders.ordername}>
                    <option value=" Select an Order "> -- Select an Order -- </option>

                    {orders.map((order) => <option key={order.id} value={order.ordername}>
                        {order.ordername}</option>)
                    }
                </select>*/}

            </div>
            <React.Fragment>
                <div className="order-list">
                    {!_.isEmpty(orders) ? (
                        //for the order in selection, create an order object 
                        selection.map((order) => (
                            <Order key={order.id} {...order} handleRemoveOrder={handleRemoveOrder}/>
                        ))
                    ) : (
                        <p className="message">Add an Order!</p>
                    )}
                </div>
            </React.Fragment>
        </React.Fragment>

    );
};

export default OrdersList;

/*
 import React, { useContext } from 'react';
import _ from 'lodash';
import Order from './Order';
import OrdersContext from '../context-folder/OrdersContext';

const OrdersList = () => {
    const { orders, setOrders } = useContext(OrdersContext);

    const removeOrderHandler = (id) => {
        setOrders(orders.filter((order) => order.id !== id));
        console.log("setOrders: " + orders);
    };

    return (
        <React.Fragment>
            <div className="order-list">
                <select value={orders}
                    onChange={removeOrderHandler}>
                    <option value=" Select an Order "> -- Select an Order -- </option>
                    {orders.map((order) => <option key={order.id} value={order.ordername}>
                        {order.ordername} </option>)
                    }
                </select>

            </div>
        </React.Fragment>
    );
};

export default OrdersList;
*/

/*
return (
    <React.Fragment>
        <div className="order-list">
            <select value={orders}
                onChange={handleOrderChange}>
                <option value=" Select an Order "> -- Select an Order -- </option>
                {orders.map((order) => <option key={order.id} value={order.ordername}>
                    {order.ordername}</option>)

                }
            </select>

        </div>
    </React.Fragment>
);
};
*/
/*
return (
    <React.Fragment>
        <div className="order-list">
            {!_.isEmpty(orders) ? (
                //for each order in orders, create an order key -...order is till the end
                orders.map((order) => (
                    <Order key={order.id} {...order} handleRemoveOrder={handleRemoveOrder} />
                ))
            ) : (
                <p className="message">Cart is Empty.</p>
            )}
        </div>
    </React.Fragment>
);
};*/