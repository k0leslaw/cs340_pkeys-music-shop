/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import '../../style/tables.css';
import RentalTableRow from "../../components/RentalOrders/RentalTableRow";

function RentalOrders ({ backendURL }) {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const onNewOrderClick = () => {
        navigate("/add-rental-order");
    }

    const getRentalOrders = async () => {
        try {
            const response = await fetch(`${backendURL}/api/rental-orders`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            setRows(data);
        } catch (err) {
            console.error("Error fetching rental orders:", err);
        }
    }

    useEffect(() => {
        getRentalOrders();
    }, [backendURL])

    return(
        <div className="page">
            <div className='table-header'>
                <div className="table-header-left">
                    <h1>Rental Orders</h1>
                    <select className="order-type-dropdown">
                        <option>All</option>
                        <option>Current</option>
                        <option>Past</option>
                        <option>Future</option>
                        <option>Late</option>
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
                        <th>Instrument</th>
                        <th>Subtotal</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => <RentalTableRow key={row.rentalOrderId} RentalOrder={row} />)}
                </tbody>
            </table>
        </div>
    )
}

export default RentalOrders;