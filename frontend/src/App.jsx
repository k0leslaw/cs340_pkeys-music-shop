const PORT = import.meta.env.VITE_BACKEND_PORT;

/**
 * Citation for the following code:
 * Date 11/05/2025
 * Adapted from Exploration - Web Application Technology:
 * https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import RentalOrders from './pages/RentalOrders/RentalOrders';
import Instruments from './pages/Instruments/Instruments';
import Customers from './pages/Customers/Customers';
import AddRentalOrder from './pages/RentalOrders/AddRentalOrder';
import AddInstrument from './pages/Instruments/AddInstrument';
import AddCustomer from './pages/Customers/AddCustomer';
import EditRentalOrder from './pages/RentalOrders/EditRentalOrder';
import EditCustomer from './pages/Customers/EditCustomer';
import EditInstrument from './pages/Instruments/EditInstrument';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = PORT;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${PORT}`;

//<Route path="/bsg-people" element={<BSGPeople backendURL={backendURL} />} />

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<RentalOrders backendURL={backendURL}/>} />
                <Route path="/instruments" element={<Instruments backendURL={backendURL}/>} />
                <Route path="/customers" element={<Customers backendURL={backendURL}/>} />
                <Route path="/add-rental-order" element={<AddRentalOrder backendURL={backendURL}/>} />
                <Route path="/add-instrument" element={<AddInstrument backendURL={backendURL}/>} />
                <Route path="/add-customer" element={<AddCustomer backendURL={backendURL}/>} />
                <Route path="/edit-rental" element={<EditRentalOrder backendURL={backendURL}/>} />
                <Route path="/edit-customer" element={<EditCustomer backendURL={backendURL}/>} />
                <Route path="/edit-instrument" element={<EditInstrument backendURL={backendURL}/>} />
            </Routes>
        </>
    );

} export default App;
