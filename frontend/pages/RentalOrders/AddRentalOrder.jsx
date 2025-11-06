import '../../style/tables.css';
import AddRentalOrderTableRow from '../../components/RentalOrders/AddRentalOrderTableRow';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddRentalOrder () {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const addAdditionalOrderRow = () => {
        // Add another table row to input rental order
        // Allows multiple separate rental orders to be added at once
        const newRow = { id: Date.now() };
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

    const handleSubmit = () => {
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
                        <th>First Name</th>
                        <th>Last Name</th>
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
                        <AddRentalOrderTableRow key={row.id} handleDeleteAdditionalRow={() => handleDeleteAdditionalRow(row.id)} />
                    ))}
                </tbody>
            </table>
            <button className='submit-button' onClick={handleCancel}>Cancel</button>
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddRentalOrder;