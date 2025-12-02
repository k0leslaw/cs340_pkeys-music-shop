USE PkeyRentalDB;


DELIMITER //


-- -------------------------------------------------------
--                     CUSTOMERS
-- -------------------------------------------------------

-- Select all customers
CREATE PROCEDURE SelectAllCustomers()
BEGIN

SELECT customerId, firstName, lastName, email, phone
FROM Customers
ORDER BY customerId;

END //







-- Create a new customer
CREATE PROCEDURE CreateNewCustomer(    
    IN p_firstName VARCHAR(255),
    IN p_lastName VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(255)

)
BEGIN
INSERT INTO Customers (firstName, lastName, email, phone) VALUES
(p_firstName, p_lastName, p_email, p_phone);

END //









-- Update customer in database
CREATE PROCEDURE UpdateCustomer(    
    IN p_customerId INT,
    IN p_firstName VARCHAR(255),
    IN p_lastName VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(255)

)
BEGIN

UPDATE Customers
SET firstName = p_firstName, lastName = p_lastName, email = p_email, phone = p_phone
WHERE customerId = p_customerId;

END //







-- Delete customer from database
CREATE PROCEDURE DeleteCustomer(    
    IN p_customerId INT
)
BEGIN

DELETE FROM Customers
WHERE customerId = p_customerId;

END //


-- -------------------------------------------------------
--                     INSTRUMENTS
-- -------------------------------------------------------


-- Select all instruments
CREATE PROCEDURE SelectAllInstruments()
BEGIN

SELECT Instruments.instrumentId, Instruments.type, Instruments.brand, Instruments.modelName, Instruments.pricePerWeek, 
    IF(MAX(CASE WHEN RentalOrders.orderStatus IN ("ACTIVE", "LATE") THEN 1 ELSE 0 END) 1, "YES", "NO") AS "Currently Rented"
FROM Instruments
LEFT JOIN RentedItems ON Instruments.instrumentId = RentedItems.instrumentId
LEFT JOIN RentalOrders ON RentedItems.rentalOrderId = RentalOrders.rentalOrderId
GROUP BY Instruments.instrumentId, Instruments.type, Instruments.brand, Instruments.modelName, Instruments.pricePerWeek
ORDER BY Instruments.instrumentId;

END //







-- Add a new instrument
CREATE PROCEDURE CreateInstrument(    
    IN p_type ENUM('Guitar', 'Violin', 'Keyboard', 'Trumpet', 'Drum Kit'),
    IN p_brand VARCHAR(255),
    IN p_modelName VARCHAR(255),
    IN p_pricePerWeek DECIMAL(10, 2)

)
BEGIN

INSERT INTO Instruments (type, brand, modelName, pricePerWeek) VALUES
(p_type, p_brand, p_modelName, p_pricePerWeek);

END //









-- Update instrument in database
CREATE PROCEDURE UpdateInstrumentPrice(
    IN p_instrumentId INT,
    IN p_pricePerWeek DECIMAL(10, 2)
)
BEGIN

UPDATE Instruments
SET pricePerWeek = p_pricePerWeek
WHERE instrumentId = p_instrumentId;

END //









-- Delete instrument from database
CREATE PROCEDURE DeleteInstrument(
    IN p_instrumentId INT
)
BEGIN

DELETE FROM Instruments
WHERE instrumentId = p_instrumentId;

END //


-- -------------------------------------------------------
--                     RENTAL ORDERS
-- -------------------------------------------------------

-- Select all rental orders
DROP PROCEDURE SelectAllRentalOrders

CREATE PROCEDURE SelectAllRentalOrders()
BEGIN
    SELECT
        RentalOrders.rentalOrderId,
        RentalOrders.rentalStart,
        RentalOrders.dueDate,
        RentalOrders.customerId,
        RentalOrders.orderStatus,
        COUNT(RentedItems.instrumentId) AS itemCount
    FROM RentalOrders
    LEFT JOIN RentedItems ON RentedItems.rentalOrderId = RentalOrders.rentalOrderId
    GROUP BY 
        RentalOrders.rentalOrderId,
        RentalOrders.rentalStart,
        RentalOrders.dueDate,
        RentalOrders.customerId,
        RentalOrders.orderStatus
    ORDER BY RentalOrders.rentalOrderId;
END //









-- Add a new rental order
CREATE PROCEDURE CreateNewRentalOrder(    
    IN p_customerId INT,
    IN p_rentalStart DATE,
    IN p_dueDate DATE,
    IN p_orderStatus ENUM('LATE', 'ACTIVE', 'COMPLETE')

)
BEGIN

INSERT INTO RentalOrders (customerId, rentalStart, dueDate, orderStatus) VALUES
(p_customerId, p_rentalStart, p_dueDate, p_orderStatus);

END //











-- Update rental order in database
CREATE PROCEDURE UpdateRentalOrder(    
    IN p_rentalOrderId INT,
    IN p_orderStatus ENUM('LATE', 'ACTIVE', 'COMPLETE')
)
BEGIN

UPDATE RentalOrders
SET orderStatus = p_orderStatus
WHERE rentalOrderId = p_rentalOrderId;

END //












-- Delete rental order from database
CREATE PROCEDURE DeleteRentalOrder(    
    IN p_rentalOrderId INT
)
BEGIN

DELETE FROM RentalOrders
WHERE rentalOrderId = p_rentalOrderId;

END //






-- -------------------------------------------------------
--                     RENTED ITEMS
-- -------------------------------------------------------
CREATE PROCEDURE SelectAllRentedItems()
BEGIN

SELECT rentalOrderId, instrumentId
FROM RentedItems;

END //





/* 
CITATIONS
**All work presented is original**