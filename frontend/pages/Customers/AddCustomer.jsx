import '../../style/tables.css';
import AddCustomerTableRow from '../../components/Customers/AddCustomerTableRow.jsx';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddCustomer () {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);

    const addAdditionalCustomerRow = () => {
        // Add another table row to input rental order
        // Allows multiple separate rental orders to be added at once
        const newRow = { id: Date.now() };
        setRows(prevRows => [...prevRows, newRow]);
    }

    const handleDeleteAdditionalRow = (idToDelete) => {
        setRows(prevRows => prevRows.filter((row) => row.id !== idToDelete));
    }

    const handleCancel = () => {
        if (window.confirm('Press OK to confirm cancelling ALL new customers currently on the screen. This cannot be undone.')) {
            navigate('/customers');
        } 
    }

    const handleSubmit = () => {
        navigate('/customers');
    }

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Create New Customer</h1>
                <button className="new-row-button" onClick={addAdditionalCustomerRow}>Add additional customer</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <AddCustomerTableRow key={row.id} handleDeleteAdditionalRow={() => handleDeleteAdditionalRow(row.id)} />
                    ))}
                </tbody>
            </table>
            <button className='submit-button' onClick={handleCancel}>Cancel</button>
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddCustomer;