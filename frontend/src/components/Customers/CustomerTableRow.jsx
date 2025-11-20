/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgPen, CgTrash } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

import '../../tables.css';

function CustomerTableRow ({ Customer }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-customer', { state: { Customer } });
    }

    const handleDeleteClick = () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this customer.')) {
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