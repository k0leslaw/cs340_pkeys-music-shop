import '../../tables.css';

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';

function EditInstrument ({ backendURL }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { Instrument } = location.state || {};
    const [newPrice, setNewPrice] = useState(Instrument.pricePerWeek);

    const handlePriceChange = (e) => {
        setNewPrice(e.target.valueAsNumber);
    }

    const handleCancel = () => {
        navigate('/instruments');
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`${backendURL}/api/update-instrument/${Instrument.instrumentId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({newPrice: newPrice})
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
        } catch (err) {
            console.error("Error editing instrument:", err);
        }
        navigate('/instruments');
    }

    const handleDelete = async () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this instrument.')) {
            try {
                const response = await fetch(`${backendURL}/api/delete-instrument/${Instrument.instrumentId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) {
                    if (response.status === 409) {
                        window.alert("This instrument is part of a rental order.\nIt cannot be deleted right now.")
                    }
                    throw new Error(`Error status: ${response.status}`);
                }
                navigate('/instruments');
            } catch (err) {
                console.error("Error deleting instrument", err);
            }
        } 
    }

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Edit Instrument</h1>
                <button className="new-row-button" onClick={handleCancel}>Cancel</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Instrument ID</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Model Name</th>
                        <th>Price/Week</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>    
                        <td>{Instrument.instrumentId}</td>
                        <td>
                            {Instrument.type}
                        </td>
                        <td>
                            {Instrument.brand}
                        </td>
                        <td>
                            {Instrument.modelName}
                        </td>
                        <td>
                            <input 
                            type="number"
                            defaultValue={Instrument.pricePerWeek}
                            min={0}
                            onChange={handlePriceChange}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className='submit-button' onClick={handleDelete}>Delete</button>
            <button className='submit-button' onClick={handleSave}>Save</button>
        </div>
    )
}

export default EditInstrument;