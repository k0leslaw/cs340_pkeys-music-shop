/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import '../../style/tables.css';
import CustomerTableRow from "../../components/Customers/CustomerTableRow";

function Customers ({ backendURL }) {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const onNewCustomerClick = () => {
        navigate("/add-customer");
    }

    const getCustomers = async () => {
        try {
            const response = await fetch(`${backendURL}/api/customers`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            setRows(data);
        } catch (err) {
            console.error("Error fetching customers:", err);
        }
    }

    useEffect(() => {
        getCustomers();
    }, [backendURL])

    return(
        <div className="page">
            <div className='table-header'>
                <div className="table-header-left">
                    <h1>Customers</h1>
                </div>
                <button className="new-row-button" onClick={onNewCustomerClick}><CgAdd /> New Customer</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => <CustomerTableRow key={row.customerId} Customer={row} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Customers;