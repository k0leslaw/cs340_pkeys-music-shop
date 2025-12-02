
DROP PROCEDURE IF EXISTS sp_load_rentaldb;
DELIMITER //
CREATE PROCEDURE sp_load_rentaldb()
BEGIN

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
-- Customers

DROP TABLE IF EXISTS `Customers`;

CREATE TABLE Customers (
    customerId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    CONSTRAINT UNIQUE (email)
);


-- RentalOrders
DROP TABLE IF EXISTS `RentalOrders`;

CREATE TABLE RentalOrders (
    rentalOrderId INT PRIMARY KEY AUTO_INCREMENT,
    customerId INT NOT NULL,
    rentalStart DATE NOT NULL,
    dueDate DATE,
    orderStatus ENUM('OPEN', 'LATE', 'ACTIVE', 'COMPLETE'),
    FOREIGN KEY (customerId) REFERENCES Customers(customerId)
);


-- Instruments
DROP TABLE IF EXISTS `Instruments`;

CREATE TABLE Instruments (
    instrumentId INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('Guitar', 'Violin', 'Keyboard', 'Trumpet', 'Drum Kit') NOT NULL,
    brand VARCHAR(100),
    modelName VARCHAR(255),
    pricePerWeek DECIMAL(10,2) NOT NULL
);


-- RentedItems
DROP TABLE IF EXISTS `RentedItems`;

CREATE TABLE RentedItems (
    rentalOrderId INT NOT NULL,
    instrumentId INT NOT NULL,
    PRIMARY KEY (rentalOrderId, instrumentId),
    FOREIGN KEY (rentalOrderId) REFERENCES RentalOrders(rentalOrderId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (instrumentId) REFERENCES Instruments(instrumentId) ON DELETE RESTRICT ON UPDATE CASCADE
);


-- Insert customer data into customers table
INSERT INTO Customers (firstName, lastName, email, phone) VALUES
('John', 'Doe', 'john.doe@email.com', '555-5647'),
('Jane', 'Doe', 'jane.smith@email.com', '555-1614'),
('Kate', 'Lals', 'kate.lals@email.com', '555-8494'),
('Sara', 'Johns', 'sarah.johns@email.com', '555-6547'),
('Mark', 'Kelley', 'mark.kelley@email.com', '555-2617');


-- Insert sample data into instruments table
INSERT INTO Instruments (type, brand, modelName, pricePerWeek) VALUES
('Guitar', 'Fender', 'Stratocaster', 40.00),
('Violin', 'Strad', '512', 33.00),
('Drum Kit', 'Gretsch', 'CM1', 80.00),
('Keyboard', 'Roland', 'FP-10', 25.00),
('Trumpet', 'Bach', 'Stradivarius 180S37', 36.00);

-- Insert sample data into rentalorders table
INSERT INTO RentalOrders (customerId, rentalStart, dueDate, orderStatus) VALUES
(1, '2023-11-01', '2023-12-17', 'COMPLETE'),
(2, '2025-10-12', '2025-10-19', 'COMPLETE'),
(3, '2025-10-11', '2025-10-21', 'ACTIVE'),
(4, '2025-10-14', '2025-10-22', 'ACTIVE'),
(5, '2025-10-15', '2025-10-16', 'LATE');

-- Insert sample data into renteditems table to reflect relationship between rentalorders and instruments
INSERT INTO RentedItems (rentalOrderId, instrumentId) VALUES
(1, 1), 
(1, 4), 
(2, 3),  
(3, 2),   
(3, 5),   
(4, 1),  
(4, 3);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

END //
DELIMITER ;


/* 
CITATIONS
**All work presented is original**