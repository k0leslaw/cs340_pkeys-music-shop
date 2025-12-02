/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgPen, CgTrash } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

import '../../tables.css';

function CustomerTableRow ({ backendURL, Customer, getCustomers }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-customer', { state: { Customer } });
    }

    const handleDeleteClick = async () => {
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
                await getCustomers();
                const data = await response.json();
                return data;
            } catch (err) {
                console.error("Error deleting customer", err);
            }
            navigate('/customers');
        } 
    }

    return (
        <tr className="table-data-row"> 
            <td>{Customer.customerId}</td>
            <td>{Customer.firstName} {Customer.lastName}</td>
            <td>{Customer.email}</td>
            <td>{Customer.phone}</td>
            <td><CgPen className="edit-button" onClick={handleEditClick} /></td>
            <td><CgTrash className="edit-button" onClick={handleDeleteClick} /></td>
        </tr>
    )
}

export default CustomerTableRow;