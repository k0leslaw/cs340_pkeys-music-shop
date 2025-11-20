/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgAdd, CgTrash } from "react-icons/cg";
import { useState, useEffect } from "react";

function EditRentalOrderTableRow ({ RentalOrder, RentedItems=[], customers, instruments=[] }) {
    const [customer, setCustomer] = useState(RentalOrder.customerId);
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

    useEffect (() => {
        setSubtotal(calculateSubtotal());
    }, [orderInstruments, startDate, dueDate, instruments]);

    return (
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
                    <option>OPEN</option>
                    <option>ACTIVE</option>
                    <option>LATE</option>
                    <option>COMPLETE</option>
                </select>
            </td>
        </tr>
    )
}

export default EditRentalOrderTableRow;