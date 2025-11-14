import '../../style/tables.css';
import EditCustomerTableRow from '../../components/Customers/EditCustomerTableRow';

import { useNavigate, useLocation } from "react-router-dom";

function EditCustomer ({ backendURL }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { Customer } = location.state || {};

    const handleCancel = () => {
        navigate('/customers');
    }

    const handleSubmit = () => {
        navigate('/customers');
    }

    const handleDelete = () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this customer.')) {
            navigate('/customers');
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
                    <EditCustomerTableRow Customer={Customer} />
                </tbody>
            </table>
            <button className='submit-button' onClick={handleDelete}>Delete</button>
            <button className='submit-button' onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default EditCustomer;