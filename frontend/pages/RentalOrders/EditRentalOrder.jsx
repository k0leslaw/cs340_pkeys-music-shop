import '../../style/tables.css';
import EditRentalOrderTableRow from '../../components/RentalOrders/EditRentalOrderTableRow';

import { useNavigate, useLocation } from "react-router-dom";

function EditRentalOrder ({ backendURL }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { RentalOrder, RentedItems, customers, instruments } = location.state || {};

    const handleCancel = () => {
        navigate('/');
    }

    const handleSubmit = () => {
        navigate('/');
    }

    const handleDelete = () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this order.')) {
            navigate('/');
        } 
    }

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
                    <EditRentalOrderTableRow 
                        RentalOrder={RentalOrder} 
                        RentedItems={RentedItems} 
                        customers={customers} 
                        instruments={instruments} 
                    />
                </tbody>
            </table>
            <button className='submit-button' onClick={handleDelete}>Delete</button>
            <button className='submit-button' onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default EditRentalOrder;