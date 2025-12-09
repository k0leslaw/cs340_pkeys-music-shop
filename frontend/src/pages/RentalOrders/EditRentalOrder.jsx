/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgAdd, CgTrash } from "react-icons/cg";
import '../../tables.css';

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

function EditRentalOrder ({ backendURL }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { RentalOrder, RentedItems, customers, instruments } = location.state || {};
    const [customer, setCustomer] = useState(RentalOrder.customerId)
    const [orderInstruments, setOrderInstruments] = useState(
        Array.isArray(RentedItems)
            ? RentedItems.map((item, index) => ({
                id: item.rentedItemId ?? `temp-${index}`, // fallback uses index
                instrumentId: item.instrumentId
            }))
            : []
    );
    const [startDate, setStartDate] = useState(RentalOrder.rentalStart.slice(0, 10));
    const [dueDate, setDueDate] = useState(RentalOrder.dueDate.slice(0, 10));
    const [subtotal, setSubtotal] = useState(0);
    const [orderStatus, setOrderStatus] = useState(RentalOrder.orderStatus);

    const handleCustomerChange = (e) => {
        setCustomer(e.target.value);
    }

    const handleInstrumentChange = (id, instrumentId) => {
        setOrderInstruments(prev => prev.map(inst => inst.id === id ? { ...inst, instrumentId } : inst));
    };

    const handleAddInstrument = () => {
        setOrderInstruments(prev => [...prev, { id: Date.now(), instrumentId: '' }]);
    };

    const handleDeleteInstrument = (id) => {
        setOrderInstruments(prev => prev.filter(inst => inst.id !== id));
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);

        if (new Date(e.target.value) > new Date(dueDate)) {
            setDueDate(e.target.value);
        }
    }

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    }

    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value);
    }

    const calculateSubtotal = () => {
        if (!startDate || !dueDate) return 0;

        const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
        const numWeeks = Math.ceil(Math.abs(new Date(startDate) - new Date(dueDate)) / MS_PER_WEEK);

        return orderInstruments.reduce((total, inst) => {
            const instrument = instruments.find(i => i.instrumentId === parseInt(inst.instrumentId));
            if (!instrument) return total;
            return total + instrument.pricePerWeek * numWeeks;
        }, 0);
    };

    const handleCancel = () => {
        navigate('/');
    }

    const handleSubmit = async () => {
        try {
            // update rental order
            const ro_response = await fetch(`${backendURL}/api/update-rental-order/${RentalOrder.rentalOrderId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    newCustomer: customer,
                    newRentalStart: startDate,
                    newDueDate: dueDate,
                    newOrderStatus: orderStatus
                })
            });
            if (!ro_response.ok) {
                throw new Error(`Error status: ${ro_response.status}`);
            }

            // update each rented item
            const instrumentsPayload = orderInstruments
                .filter(inst => inst.instrumentId)
                .map(inst => ({ instrumentId: parseInt(inst.instrumentId) }));


            const ri_response = await fetch(`${backendURL}/api/update-rented-item/${RentalOrder.rentalOrderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    instruments: orderInstruments
                    .filter(inst => inst.instrumentId)
                    .map(inst => ({ instrumentId: parseInt(inst.instrumentId) }))
                })
            });

            if (!ri_response.ok) throw new Error(`Error updating rented item: ${ri_response.status}`);

        } catch (err) {
            console.error("Error editing rented item:", err);
        }
        navigate('/');
    }

    const handleDelete = async () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this order.')) {
            try {
                const ro_response = await fetch(`${backendURL}/api/delete-rental-order/${RentalOrder.rentalOrderId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!ro_response.ok) {
                    throw new Error(`Error status: ${ro_response.status}`);
                }

                const ri_response = await fetch(`${backendURL}/api/delete-rented-item/${RentalOrder.rentalOrderId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!ri_response.ok) {
                    throw new Error(`Error status: ${ri_response.status}`);
                }
                navigate('/');
            } catch (err) {
                console.error("Error deleting rental order", err);
            }
        } 
    }

    useEffect (() => {
            setSubtotal(calculateSubtotal());
    }, [orderInstruments, startDate, dueDate, instruments]);

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Edit Rental Order</h1>
                <button className="new-row-button" onClick={handleCancel}>Cancel</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rental ID</th>
                        <th>Customer</th>
                        <th>Instrument</th>
                        <th>Start Date</th>
                        <th>Return Date</th>
                        <th>Subtotal</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{RentalOrder.rentalOrderId}</td>
                        <td>
                            <select value={customer} onChange={handleCustomerChange}>
                                {Object.entries(customers).map(([key, name]) => 
                                    <option key={key} value={key}>
                                        {name} [ID: {key}]
                                    </option>)}
                            </select>
                        </td>
                        <td>
                            {orderInstruments.map(inst => (
                                <div key={inst.id} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                                    <select
                                        value={inst.instrumentId || ''}
                                        onChange={e => handleInstrumentChange(inst.id, e.target.value)}
                                    >
                                        <option value="">Select Instrument</option>
                                        {Array.isArray(instruments) && instruments.map(i => (
                                            <option key={i.instrumentId} value={i.instrumentId}>
                                                {i.brand} {i.modelName}
                                            </option>
                                        ))}
                                    </select>
                                    <CgTrash className="delete-additional-row-button" onClick={() => handleDeleteInstrument(inst.id)} />
                                </div>
                            ))}
                            <CgAdd className="add-button" onClick={handleAddInstrument} />
                        </td>
                        <td><input type="date" value={startDate} onChange={handleStartDateChange}/></td>
                        <td><input type="date" value={dueDate} onChange={handleDueDateChange} min={startDate}/></td>
                        <td>{subtotal}</td>
                        <td>
                            <select value={orderStatus} onChange={handleOrderStatusChange}>
                                <option>ACTIVE</option>
                                <option>LATE</option>
                                <option>COMPLETE</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className='submit-button' onClick={handleDelete}>Delete</button>
            <button className='submit-button' onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default EditRentalOrder;