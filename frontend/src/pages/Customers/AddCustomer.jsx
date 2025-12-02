import '../../tables.css';
import AddCustomerTableRow from '../../components/Customers/AddCustomerTableRow.jsx';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddCustomer ({ backendURL }) {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);

    const addAdditionalCustomerRow = () => {
        // Add another table row to input customer
        // Allows multiple separate customers to be added at once
        const newRow = { 
            id: Date.now(),
            firstName: "",
            lastName: "",
            email: "",
            phone: "" 
        }; 
        setRows(prevRows => [...prevRows, newRow]);
    }

    const updateRow = (id, field, value) => {
        setRows(prev =>
            prev.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    }

    const handleDeleteAdditionalRow = (idToDelete) => {
        setRows(prevRows => prevRows.filter((row) => row.id !== idToDelete));
    }

    const handleCancel = () => {
        if (window.confirm('Press OK to confirm cancelling ALL new customers currently on the screen. This cannot be undone.')) {
            navigate('/customers');
        } 
    }

    const handleSubmit = async () => {
        for (let i = 0; i < rows.length; i++) {
            try {
                const response = await fetch(`${backendURL}/api/create-customer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    firstName: rows[i].firstName,
                    lastName: rows[i].lastName,
                    email: rows[i].email,
                    phone: rows[i].phone
                 })
                });
                if (!response.ok) {
                    throw new Error(`Error status: ${response.status}`);
                }
            } catch (err) {
                console.error("Error creating customer", err);
            }            
        }
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
                        <AddCustomerTableRow key={row.id} row={row} updateRow={updateRow} handleDeleteAdditionalRow={() => handleDeleteAdditionalRow(row.id)} />
                    ))}
                </tbody>
            </table>
            <button className='submit-button' onClick={handleCancel}>Cancel</button>
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddCustomer;