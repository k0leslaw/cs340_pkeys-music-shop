require('dotenv').config({ path: '../.env' });

const PORT = process.env.VITE_BACKEND_PORT;

/**
 * Citation for the following code:
 * Date 11/05/2025
 * Adapted from Exploration - Web Application Technology:
 * https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
 */

// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests

// ########################################
// ########## ROUTE HANDLERS

// CREATE ROUTES
app.post('/api/reset-database', async (req, res) => {
  try {
    await db.query("CALL sp_load_rentaldb()");
    res.json({ message: "Database has been reset" });
  } catch (err) {
    console.error("Error resetting database:", err);
    res.status(500).json({ error: "Error resetting database" });
  }
});

// READ ROUTES
app.get('/api/instruments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Instruments;');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching instruments:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Customers;');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/customers/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const [rows] = await db.query("SELECT firstName, lastName FROM Customers WHERE customerId = ?;",
      [customerId]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching customer by Id:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/rental-orders', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RentalOrders;');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching rental orders:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/rented-items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RentedItems;');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching rented items:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE ROUTES
app.delete('/api/delete-rental-order/:id', async (req, res) => {
  try {
    const rentalOrderId = req.params.id;
    await db.query(`CALL DeleteRentalOrder(${rentalOrderId})`);
    res.status(200).send({ message: "Rental order deleted" });
  } catch (err) {
    console.error("Error deleting rental order:", err);
    res.status(500).send({ error: "Error deleting rental order" });
  }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});