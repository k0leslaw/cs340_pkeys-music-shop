const PORT = import.meta.env.VITE_BACKEND_PORT;

/**
 * Citation for the following code:
 * Date 11/05/2025
 * Copied from Exploration - Web Application Technology:
 * https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import BSGPeople from '../pages/BSGPeople';

// Components
import Navigation from '../components/Navigation';

// Define the backend port and URL for API requests
const backendPort = PORT;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${PORT}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bsg-people" element={<BSGPeople backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;
