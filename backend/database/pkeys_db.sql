USE PkeyRentalDB;
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Customers
CREATE TABLE Customers (
    customerId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    CONSTRAINT UNIQUE (email)
);


-- RentalOrders
CREATE TABLE RentalOrders (
    rentalOrderId INT PRIMARY KEY AUTO_INCREMENT,
    customerId INT NOT NULL,
    rentalStart DATE NOT NULL,
    dueDate DATE,
    orderStatus ENUM('LATE', 'ACTIVE', 'COMPLETE'),
    FOREIGN KEY (customerId) REFERENCES Customers(customerId)
);


-- Instruments
CREATE TABLE Instruments (
    instrumentId INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    modelName VARCHAR(255),
    pricePerWeek DECIMAL(10,2) NOT NULL
);


-- RentedItems
CREATE TABLE RentedItems (
    rentalOrderId INT NOT NULL,
    instrumentId INT NOT NULL,
    subTotal DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (rentalOrderId, instrumentId),
    FOREIGN KEY (rentalOrderId) REFERENCES RentalOrders(rentalOrderId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (instrumentId) REFERENCES Instruments(instrumentId) ON DELETE RESTRICT ON UPDATE CASCADE,
    CHECK (subtotal >= 0)
);


-- DATA
INSERT INTO Customers (firstName, lastName, email, phone) VALUES
('John', 'Doe', 'john.doe@email.com', '555-5647'),
('Jane', 'Doe', 'jane.smith@email.com', '555-1614'),
('Kate', 'Lals', 'kate.lals@email.com', '555-8494'),
('Sara', 'Johns', 'sarah.johns@email.com', '555-6547'),
('Mark', 'Kelley', 'mark.kelley@email.com', '555-2617');



INSERT INTO Instruments (type, brand, modelName, pricePerWeek) VALUES
('Guitar', 'Fender', 'Stratocaster', 40.00),
('Violin', 'Strad', '512', 33.00),
('Drum Kit', 'Gretsch', 'CM1', 80.00),
('Keyboard', 'Roland', 'FP-10', 25.00),
('Trumpet', 'Bach', 'Stradivarius 180S37', 36.00);


INSERT INTO RentalOrders (customerId, rentalStart, dueDate, orderStatus) VALUES
(1, '2023-11-01', '2023-12-17', 'COMPLETE'),
(2, '2025-10-12', '2025-10-19', 'COMPLETE'),
(3, '2025-10-11', '2025-10-21', 'ACTIVE'),
(4, '2025-10-14', '2025-10-22', 'ACTIVE'),
(5, '2025-10-15', '2025-10-01', 'LATE');


INSERT INTO RentedItems (rentalOrderId, instrumentId, subTotal) VALUES
(1, 1, 40.00), 
(1, 4, 25.00), 
(2, 3, 80.00),  
(3, 2, 33.00),   
(3, 5, 36.00),   
(4, 1, 40.00),  
(4, 3, 80.00);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
