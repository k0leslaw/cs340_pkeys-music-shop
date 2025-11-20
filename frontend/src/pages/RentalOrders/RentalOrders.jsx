/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import '../../tables.css';
import RentalTableRow from "../../components/RentalOrders/RentalTableRow";

function RentalOrders ({ backendURL }) {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [customers, setCustomers] = useState({});
    const [instruments, setInstruments] = useState({});
    const [instrumentText, setInstrumentText] = useState({});
    const [rentedItems, setRentedItems] = useState([]);

    // filter orders by order status
    const handleDropdownChange = (e) => {
        if (e.target.value === 'ALL') {
            setFilteredRows(rows);
        } else {
            setFilteredRows(rows.filter(row => {if (row.orderStatus === e.target.value) {return row}}));
        }
    }

    // navigate to new order page
    const onNewOrderClick = () => {
        navigate("/add-rental-order");
    }

    const resetSampleData = async () => {
        if (window.confirm('Press OK to confirm resetting the database.\nThis cannot be undone.')){
            try {
            const response = await fetch(`${backendURL}/api/reset-database`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            // update the table rows
            await getRentalOrders();
            await getCustomers();
            await getInstruments();
            await getRentedItems();
        } catch (err) {
            console.error("Error resetting sample data", err);
        }
        }
    }

    const getRentalOrders = async () => {
        try {
            const response = await fetch(`${backendURL}/api/rental-orders`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            setRows(data);
            setFilteredRows(data);
        } catch (err) {
            console.error("Error fetching rental orders:", err);
        }
    }

    const getCustomers = async () => {
        try {
            const response = await fetch(`${backendURL}/api/customers`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            } 
            const data = await response.json(); 
            const map = {};
            data.forEach(c => {
                map[c.customerId] = `${c.firstName} ${c.lastName}`;
            });

            setCustomers(map);
        } catch (err) {
            console.error('error fetching customers:', err);
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
            const map = {};
            data.forEach(i => {
                map[i.instrumentId] = `${i.brand} ${i.modelName}`;
            });
            setInstrumentText(map);
        } catch (err) {
            console.error('error fetching instruments:', err);
        }
    }

    const getRentedItems = async () => {
        try {
            const response = await fetch(`${backendURL}/api/rented-items`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            } 
            const data = await response.json(); 
            setRentedItems(data);
        } catch (err) {
            console.error('error fetching rented items:', err);
        }
    }

    useEffect(() => {
        getRentalOrders();
        getCustomers();
        getInstruments();
        getRentedItems();
    }, [])

    return(
        <div className="page">
            <div className='table-header'>
                <div className="table-header-left">
                    <h1>Rental Orders</h1>
                    <select className="order-type-dropdown" onChange={handleDropdownChange}>
                        <option>ALL</option>
                        <option>OPEN</option>
                        <option>ACTIVE</option>
                        <option>COMPLETE</option>
                        <option>LATE</option>
                    </select>
                </div>
                <button className="new-row-button" onClick={onNewOrderClick}><CgAdd /> New Order</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rental ID</th>
                        <th>Rental Start</th>
                        <th>Due Date</th>
                        <th>Customer</th>
                        <th>Instruments</th>
                        <th>Subtotal</th>
                        <th>Order Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row) => {
                        const rentedItemsForOrder = rentedItems.filter(item => item.rentalOrderId === row.rentalOrderId);
                        return (
                            <RentalTableRow
                                key={row.rentalOrderId}
                                backendURL={backendURL}
                                RentalOrder={row}
                                RentedItems={rentedItemsForOrder}
                                customers={customers}
                                instrumentText={instrumentText}
                                instruments={instruments}
                                getRentalOrders={getRentalOrders}
                            />
                        );
                    })}
                </tbody>
            </table>
            <div>
                <p>NOTE ON CURRENT DRAFT FUNCTIONALITY:</p>
                <p>delete rows with the trash icon, then reset full database with button below</p>
                <button onClick={resetSampleData}>RESET SAMPLE DATA</button>
            </div>
        </div>
    )
}

export default RentalOrders;