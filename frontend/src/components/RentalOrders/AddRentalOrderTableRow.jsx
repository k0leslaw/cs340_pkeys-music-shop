/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgTrash, CgAdd } from "react-icons/cg";
import { useState, useEffect } from "react";

function AddRentalOrderTableRow ({ handleDeleteAdditionalRow, backendURL }) {
    const [customers, setCustomers] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedReturnDate, setSelectedReturnDate] = useState('');
    const [orderInstruments, setOrderInstruments] = useState([{ id: Date.now(), instrumentId: ''}]);

    const getCustomers = async () => {
        try {
            const response = await fetch(`${backendURL}/api/customers`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            setCustomers(data);
        } catch (err) {
            console.error("Error fetching customer:",err);
        }
    }

    const getInstruments = async () => {
        try {
            const response = await fetch(`${backendURL}/api/instruments`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            setInstruments(data);
        } catch (err) {
            console.error("Error fetching instruments:",err);
        }
    }

    const handleAddInstrument = () => {
        setOrderInstruments(prev => [...prev, { id: Date.now(), instrumentId: ''}]);
    };

    const handleDeleteInstrument = (id) => {
        setOrderInstruments(prev => prev.filter(inst => inst.id !== id));
    };

    const handleInstrumentChange = (id, value) => {
        setOrderInstruments(prev => prev.map(inst => inst.id === id ? { ...inst, instrumentId: value } : inst));
    };
    
    const handleSelectStartDate = (e) => {
        setSelectedStartDate(e.target.value);

        if (new Date(selectedReturnDate) < new Date(e.target.value)) {
            setSelectedReturnDate(e.target.value);
        }
    }

    const handleSelectReturnDate = (e) => {
        setSelectedReturnDate(e.target.value);
    }

    const calculateSubtotal = () => {
        if (!selectedStartDate || !selectedReturnDate) return '-';

        const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
        const numWeeks = Math.ceil(
            Math.abs(new Date(selectedReturnDate) - new Date(selectedStartDate)) / MS_PER_WEEK
        );

        return orderInstruments.reduce((total, inst) => {
            const instrumentObj = instruments.find(i => i.instrumentId === parseInt(inst.instrumentId));
            if (!instrumentObj) return total;

            return total + instrumentObj.pricePerWeek * numWeeks;
        }, 0);
    }

    useEffect(() => {
        getCustomers();
        getInstruments();
    }, [backendURL])

    return (
        <tr>
            <td>
                <select>
                    <option>Select Customer</option>
                    {customers.map((customer) => <option key={customer.customerId}>{customer.firstName} {customer.lastName} [ID: {customer.customerId}]</option>)}
                </select>
            </td>
            <td>
                {orderInstruments.map(inst => (
                    <div key={inst.id} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                        <select value={inst.instrumentId} onChange={e => handleInstrumentChange(inst.id, e.target.value)}>
                            <option>Select Instrument</option>
                            {instruments.map(i => <option key={i.instrumentId} value={i.instrumentId}>{i.brand} {i.modelName}</option>)}
                        </select>
                        <CgTrash className="delete-additional-row-button" onClick={() => handleDeleteInstrument(inst.id)} />
                    </div>
                ))}
                <CgAdd className="add-button" onClick={handleAddInstrument} />
            </td>
            <td><input type="date" value={selectedStartDate} onChange={e => setSelectedStartDate(e.target.value)} /></td>
            <td><input type="date" value={selectedReturnDate} min={selectedStartDate} onChange={e => setSelectedReturnDate(e.target.value)} /></td>
            <td>{calculateSubtotal()}</td>
            <td>
                <select>
                    <option>Open</option>
                    <option>Active</option>
                    <option>Late</option>
                    <option>Complete</option>
                </select>
            </td>
            <td className="delete-additional-row-button" onClick={handleDeleteAdditionalRow}><CgTrash /></td>
        </tr>
    )
}

export default AddRentalOrderTableRow;