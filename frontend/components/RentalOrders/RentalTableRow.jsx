import { useNavigate } from "react-router-dom";

import '../../style/tables.css';

function RentalTableRow ({ RentalOrder }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-rental', { state: { RentalOrder } });
    }

    return (
        <tr className="table-data-row" onClick={handleEditClick}>
            <td>{RentalOrder.rentalOrderId}</td>
            <td>{new Date(RentalOrder.rentalStart).toLocaleDateString()}</td>
            <td>{new Date(RentalOrder.dueDate).toLocaleDateString()}</td>
            <td>{RentalOrder.customerId}</td>
            <td>-</td>
            <td>-</td>
            <td>{RentalOrder.orderStatus}</td>
        </tr>
    )
}

export default RentalTableRow;