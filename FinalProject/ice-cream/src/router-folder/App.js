import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainNavigationPage from '../components-folder/MainNavigationPage';
import AddOrder from '../components-folder/AddOrder';
import OrdersList from '../components-folder/OrdersList';
import useLocalStorage from '../hooks-folder/useLocalStorage';
import EditOrder from '../components-folder/EditOrder';
import OrdersContext from '../context-folder/OrdersContext';

const App = () => {
    const [orders, setOrders] = useLocalStorage('orders', []);
    return (
        <BrowserRouter>
            <div>
                <MainNavigationPage />
                <div className="main-content">
                    <OrdersContext.Provider value={{ orders, setOrders }}>
                        <Routes>
                            <Route exact path="/" element={<OrdersList />}></Route>
                            <Route path="/add" element={<AddOrder />}></Route>
                            <Route path="/edit/:id" element={<EditOrder />}></Route>
                            <Route path="/" element={() => <Navigate to="/" />}></Route>
                        </Routes>
                    </OrdersContext.Provider>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;






