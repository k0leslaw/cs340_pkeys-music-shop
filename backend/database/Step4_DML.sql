USE PkeyRentalDB;


-- -------------------------------------------------------
--                     CUSTOMERS
-- -------------------------------------------------------

-- Select all customers
SELECT customerId, firstName, lastName, email, phone
FROM Customers
ORDER BY customerId;

-- Create a new customer
INSERT INTO Customers (firstName, lastName, email, phone) VALUES
(?, ?, ?, ?);

-- Update customer in database
UPDATE Customers
SET firstName = ?, lastName = ?, email = ?, phone = ?
WHERE customerId = ?;

-- Delete customer from database
DELETE FROM Customers
WHERE customerId = ?;


-- -------------------------------------------------------
--                     INSTRUMENTS
-- -------------------------------------------------------


-- Select all instruments
SELECT Instruments.instrumentId, Instruments.type, Instruments.brand, Instruments.modelName, Instruments.pricePerWeek, RentalOrders.orderStatus AS "Currently Rented"
FROM Instruments
LEFT JOIN RentedItems ON Instruments.instrumentId = RentedItems.instrumentId
LEFT JOIN RentalOrders ON RentedItems.rentalOrderId = RentalOrders.rentalOrderId
ORDER BY Instruments.instrumentId;

-- Add a new instrument
INSERT INTO Instruments (type, brand, modelName, pricePerWeek) VALUES
(?, ?, ?, ?);

-- Update instrument in database
UPDATE Instruments
SET pricePerWeek = ?
WHERE instrumentId = ?;

-- Delete instrument from database
DELETE FROM Instruments
WHERE instrumentId = ?;


-- -------------------------------------------------------
--                     RENTAL ORDERS
-- -------------------------------------------------------

-- Select all rental orders
SELECT RentalOrders.rentalOrderId, RentalOrders.rentalStart, RentalOrders.dueDate, RentalOrders.customerId, Instruments.type, Instruments.pricePerWeek, RentalOrders.orderStatus
FROM RentalOrders
JOIN RentedItems ON RentalOrders.rentalOrderId = RentedItems.rentalOrderId
JOIN Instruments ON RentedItems.instrumentId = Instruments.instrumentId
ORDER BY Instruments.instrumentId;

-- Add a new rental order
INSERT INTO RentalOrders (customerId, rentalStart, dueDate, orderStatus) VALUES
(?, ?, ?, ?);

-- Update rental order in database
UPDATE RentalOrders
SET orderStatus = ?
WHERE rentalOrderId = ?;

-- Delete rental order from database
DELETE FROM RentalOrders
WHERE rentalOrderId = ?;



-- -------------------------------------------------------
--                     RENTED ITEMS
-- -------------------------------------------------------
SELECT rentalOrderId, instrumentId
FROM RentedItems;





/* 
CITATIONS
**All work presented is original**