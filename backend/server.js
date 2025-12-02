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

app.post('/api/create-instrument', async (req, res) => {
  try {
    const { type, brand, modelName, pricePerWeek } = req.body;
    if (!type || !brand || !modelName || !pricePerWeek) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "CALL CreateInstrument(?, ?, ?, ?)"
    await db.query(sql, [type, brand, modelName, pricePerWeek]);
    res.status(201).json({ message: "Instrument created successfully" });
  } catch (err) {
    console.error("Error creating instrument:", err);
    res.status(500).json({ error: "Error creating instrument" });
  }
})

app.post('/api/create-customer', async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "CALL CreateNewCustomer(?, ?, ?, ?)"
    await db.query(sql, [firstName, lastName, email, phone]);
    res.status(201).json({ message: "Customer created successfully" });
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({ error: "Error creating customer" });
  }
})

// READ ROUTES
app.get('/api/instruments', async (req, res) => {
  try {
    const [result] = await db.query('CALL SelectAllInstruments()');
    const rows = result[0];
    res.json(rows);
  } catch (error) {
    console.error("Error fetching instruments:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const [result] = await db.query('CALL SelectAllCustomers()');
    const rows = result[0];
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
    const [result] = await db.query("CALL SelectAllRentalOrders()");
    const rows = result[0];
    res.json(rows);
  } catch (error) {
    console.error("Error fetching rental orders:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/rented-items', async (req, res) => {
  try {
    const [result] = await db.query("CALL SelectAllRentedItems()");
    const rows = result[0];
    res.json(rows);
  } catch (error) {
    console.error("Error fetching rented items:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE ROUTES
app.put('/api/update-instrument/:id', async (req, res) => {
  try {
    const instrumentId = req.params.id;
    const newPrice = req.body.newPrice;
    await db.query('CALL UpdateInstrumentPrice(?, ?)', [instrumentId, newPrice]);
    res.status(200).json({ message: "Instrument updated successfully" });
  } catch (err) {
    console.error("Error updating instrument:", err);
    res.status(500).send({ error: "Error updating instrument"});
  }
})

app.put('/api/update-customer/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const { newFName, newLName, newEmail, newPhone } = req.body;
    await db.query('CALL UpdateCustomer(?, ?, ?, ?, ?)', [customerId, newFName, newLName, newEmail, newPhone]);
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error("Error updating customer:", err);
    res.status(500).send({ error: "Error updating customer"});
  }
})

// DELETE ROUTES
app.delete('/api/delete-rental-order/:id', async (req, res) => {
  try {
    const rentalOrderId = req.params.id;
    await db.query("CALL DeleteRentalOrder(?)", [rentalOrderId]);
    res.status(200).send({ message: "Rental order deleted" });
  } catch (err) {
    console.error("Error deleting rental order:", err);
    res.status(500).send({ error: "Error deleting rental order" });
  }
});

app.delete('/api/delete-instrument/:id', async (req, res) => {
  try {
    const instrumentId = req.params.id;
    await db.query("CALL DeleteInstrument(?)", [instrumentId]);
    res.status(200).send({ message: "Instrument deleted" });
  } catch (err) {
    if (err.errno === 1451) {
      return res.status(409).json({error: "Instrument cannot be deleted because it is part of a rental order."})
    }
    console.error("Error deleting instrument:", err);
    res.status(500).send({ error: "Error deleting instrument" });
  }
});

app.delete('/api/delete-customer/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    await db.query("CALL DeleteCustomer(?)", [customerId]);
    res.status(200).send({ message: "Instrument deleted" });
  } catch (err) {
    if (err.errno === 1451) {
      return res.status(409).json({error: "Customer cannot be deleted because they are part of a rental order."})
    }
    console.error("Error deleting customer:", err);
    res.status(500).send({ error: "Error deleting customer" });
  }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});