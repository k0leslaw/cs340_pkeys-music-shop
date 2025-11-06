import { useNavigate } from 'react-router-dom';

import '../../style/tables.css';

function CustomerTableRow ({ Customer }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-customer', { state: { Customer } });
    }

    return (
        <tr className="table-data-row" onClick={handleEditClick}>    
            <td>{Customer.customerId}</td>
            <td>{Customer.firstName} {Customer.lastName}</td>
            <td>{Customer.email}</td>
            <td>{Customer.phone}</td>
        </tr>
    )
}

export default CustomerTableRow;