/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgPen, CgTrash } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

import '../../style/tables.css';

function InstrumentTableRow ({ Instrument, rentalOrders, rentedItems }) {
    const navigate = useNavigate();
    
    const isRented = rentedItems.some(item => {
        if (item.instrumentId !== Instrument.instrumentId) return false;
        const order = rentalOrders.find(ro => ro.rentalOrderId === item.rentalOrderId);
        return order && (order.orderStatus === "ACTIVE" || order.orderStatus === "LATE");
    });

    const handleEditClick = () => {
        navigate('/edit-instrument', { state: { Instrument } });
    }

    const handleDeleteClick = () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this instrument.')) {
            navigate('/instruments');
        } 
    }

    return (
        <tr className="table-data-row">
            <td>{Instrument.instrumentId}</td>
            <td>{Instrument.type}</td>
            <td>{Instrument.brand}</td>
            <td>{Instrument.modelName}</td>
            <td>{Instrument.pricePerWeek}</td>
            <td>{isRented ? "Yes" : "No"}</td>
            <td><CgPen className="edit-button" onClick={handleEditClick} /></td>
            <td><CgTrash className="delete-button" onClick={handleDeleteClick} /></td>
        </tr>
    )
}

export default InstrumentTableRow;