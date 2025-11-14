const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const PORT = process.env.VITE_FRONTEND_PORT;

/**
 * Citation for the following code:
 * Date 11/05/2025
 * Copied from Exploration - Web Application Technology:
 * https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
 */

// ########################################
// ########## SETUP

const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

// ########################################
// ########## ROUTE HANDLERS

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ########################################
// ########## LISTENER

app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});