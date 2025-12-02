import '../../tables.css';
import AddInstrumentTableRow from '../../components/Instruments/AddInstrumentTableRow';

import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function AddInstrument ({ backendURL }) {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const addAdditionalInstrumentRow = () => {
        // Add another table row to input instrument
        // Allows multiple separate instruments to be added at once
        const newRow = { 
            id: Date.now(),
            type: "Guitar",
            brand: "",
            modelName: "",
            pricePerWeek: "" 
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
        if (window.confirm('Press OK to confirm cancelling ALL new instruments currently on the screen. This cannot be undone.')) {
            navigate('/instruments');
        } 
    }

    const handleSubmit = async () => {
        for (let i = 0; i < rows.length; i++) {
            try {
                const response = await fetch(`${backendURL}/api/create-instrument`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    type: rows[i].type,
                    brand: rows[i].brand,
                    modelName: rows[i].modelName,
                    pricePerWeek: rows[i].pricePerWeek
                 })
                });
                if (!response.ok) {
                    throw new Error(`Error status: ${response.status}`);
                }
            } catch (err) {
                console.error("Error creating instrument", err);
            }            
        }
        navigate('/instruments');
    }

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Create New Instrument</h1>
                <button className="new-row-button" onClick={addAdditionalInstrumentRow}>Add additional instrument</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Model Name</th>
                        <th>Price/Week</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <AddInstrumentTableRow key={row.id} row={row} updateRow={updateRow} handleDeleteAdditionalRow={() => handleDeleteAdditionalRow(row.id)} />
                    ))}
                </tbody>
            </table>
            <button className='submit-button' onClick={handleCancel}>Cancel</button>
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddInstrument;