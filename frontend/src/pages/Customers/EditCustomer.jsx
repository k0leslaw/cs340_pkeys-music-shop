import '../../tables.css';

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';

function EditCustomer ({ backendURL }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { Customer } = location.state || {};
    const [newFName, setNewFName] = useState(Customer.firstName);
    const [newLName, setNewLName] = useState(Customer.lastName);
    const [newEmail, setNewEmail] = useState(Customer.email);
    const [newPhone, setNewPhone] = useState(Customer.phone);

    const handleCancel = () => {
        navigate('/customers');
    }

    const handleFNameChange = (e) => {
        setNewFName(e.target.value);
    }

     const handleLNameChange = (e) => {
        setNewLName(e.target.value);
    }

     const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    }

     const handlePhoneChange = (e) => {
        setNewPhone(e.target.value);
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`${backendURL}/api/update-customer/${Customer.customerId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    newFName: newFName,
                    newLName: newLName,
                    newEmail: newEmail,
                    newPhone: newPhone
                })
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
        } catch (err) {
            console.error("Error editing customer:", err);
        }
        navigate('/customers');
    }

    const handleDelete = async () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this customer.')) {
            try {
                const response = await fetch(`${backendURL}/api/delete-customer/${Customer.customerId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) {
                    if (response.status === 409) {
                        window.alert("This customer is part of a rental order.\nThey cannot be deleted right now.")
                    }
                    throw new Error(`Error status: ${response.status}`);
                }
                navigate('/customers');
            } catch (err) {
                console.error("Error deleting customer", err);
            }
        } 
    }

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Edit Customer</h1>
                <button className="new-row-button" onClick={handleCancel}>Cancel</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>    
                        <td>{Customer.customerId}</td>
                        <td>
                            <input 
                            type="text"
                            defaultValue={Customer.firstName}
                            onChange={handleFNameChange}/>
                        </td>
                        <td>
                            <input 
                            type="text"
                            defaultValue={Customer.lastName}
                            onChange={handleLNameChange}/>
                        </td>
                        <td>
                            <input 
                            type="text"
                            defaultValue={Customer.email}
                            onChange={handleEmailChange}/>
                        </td>
                        <td>
                            <input 
                            type="text"
                            defaultValue={Customer.phone}
                            onChange={handlePhoneChange}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className='submit-button' onClick={handleDelete}>Delete</button>
            <button className='submit-button' onClick={handleSave}>Save</button>
        </div>
    )
}

export default EditCustomer;