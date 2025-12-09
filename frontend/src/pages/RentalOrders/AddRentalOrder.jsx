import '../../tables.css';
import AddRentalOrderTableRow from '../../components/RentalOrders/AddRentalOrderTableRow';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddRentalOrder ({ backendURL }) {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const updateRow = (id, updatedFields) => {
        setRows(prev =>
            prev.map(r => r.id === id ? { ...r, ...updatedFields } : r)
        );
    };

    const addAdditionalOrderRow = () => {
        // Add another table row to input rental order
        // Allows multiple separate rental orders to be added at once
        const newRow = {
            id: Date.now(),
            customerId: "",
            instrument: [],
            startDate: "",
            dueDate: "",
            orderStatus: "ACTIVE",
            subtotal: 0,
            rentalOrderId: null
        };
        setRows(prevRows => [...prevRows, newRow]);
    }

    const handleDeleteAdditionalRow = (idToDelete) => {
        setRows(prevRows => prevRows.filter((row) => row.id !== idToDelete));
    }

    const handleCancel = () => {
        if (window.confirm('Press OK to confirm cancelling ALL new rental orders currently on the screen. This cannot be undone.')) {
            navigate('/');
        } 
    }

    const createRentalOrder = async (i) => {
        try {
            const response = await fetch(`${backendURL}/api/create-rental-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                customerId: rows[i].customerId,
                startDate: rows[i].startDate,
                dueDate: rows[i].dueDate,
                orderStatus: rows[i].orderStatus
                })
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }

            const data = await response.json();
            updateRow(rows[i].id, { rentalOrderId: data.rentalOrderId });
            return data.rentalOrderId;
        } catch (err) {
            console.error("Error creating rental order", err);
        }      
    }

    const createRentedItem = async (i, instrumentId, rentalOrderId) => {
        const response = await fetch(`${backendURL}/api/create-rented-item`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                rentalOrderId,
                instrumentId
            })
        });
    }

    const handleSubmit = async () => {
        for (let i = 0; i < rows.length; i++) {
            const rentalOrderId = await createRentalOrder(i);
            for (let j = 0; j < rows[i].instrument.length; j++) {
                await createRentedItem(i, parseInt(rows[i].instrument[j]), rentalOrderId);
            }
        }
        navigate('/');
    }

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Create New Rental Order</h1>
                <button className="new-row-button" onClick={addAdditionalOrderRow}>Add additional order</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Instrument</th>
                        <th>Start Date</th>
                        <th>Return Date</th>
                        <th>Subtotal</th>
                        <th>Order Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <AddRentalOrderTableRow 
                            key={row.id} 
                            row={row}
                            handleDeleteAdditionalRow={() => handleDeleteAdditionalRow(row.id)}
                            updateRow={updateRow} 
                            backendURL={backendURL} />
                    ))}
                </tbody>
            </table>
            <button className='submit-button' onClick={handleCancel}>Cancel</button>
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddRentalOrder;