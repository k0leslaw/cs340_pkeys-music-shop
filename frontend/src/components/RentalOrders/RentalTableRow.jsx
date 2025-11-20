/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgPen, CgTrash } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import '../../tables.css';

function RentalTableRow ({ backendURL, RentalOrder, RentedItems, customers, instruments, instrumentText, getRentalOrders }) {
    const navigate = useNavigate();

    const { rentalOrderId, customerId, rentalStart, dueDate, orderStatus } = RentalOrder;
    const customerName = customers[customerId] || customerId;
    
    const instrumentNames = RentedItems.map(item => instrumentText[item.instrumentId] || '').join(', ');

    const handleEditClick = () => {
        navigate('/edit-rental', { state: { RentalOrder, RentedItems, customers, instruments } });
    };

    const handleDeleteClick = async () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this order.')) {
            try {
                const response = await fetch(`${backendURL}/api/delete-rental-order/${rentalOrderId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`Error status: ${response.status}`);
                }

                await getRentalOrders();
            } catch (err) {
                console.error("Error deleting rental order:", err);
            }
            navigate('/');
        } 
    }

    const calculateSubtotal = () => {
        if (!rentalStart || !dueDate) return 0;

        const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
        const numWeeks = Math.ceil(
            Math.abs(new Date(rentalStart) - new Date(dueDate)) / MS_PER_WEEK
        );

        return RentedItems.reduce((total, item) => {
            const instrument = instruments.find(i =>
                Number(i.instrumentId) === Number(item.instrumentId)
            );
            if (!instrument) return total;
            return total + instrument.pricePerWeek * numWeeks;
        }, 0);
    };

    return (
        <tr className="table-data-row">
            <td>{rentalOrderId}</td>
            <td>{new Date(rentalStart).toLocaleDateString()}</td>
            <td>{new Date(dueDate).toLocaleDateString()}</td>
            <td>{customerName}</td>
            <td>{instrumentNames}</td>
            <td>{calculateSubtotal()}</td>
            <td>{orderStatus}</td>
            <td><CgPen className="edit-button" onClick={handleEditClick} /></td>
            <td><CgTrash className="delete-button" onClick={handleDeleteClick} /></td>
        </tr>
    )
}

export default RentalTableRow;