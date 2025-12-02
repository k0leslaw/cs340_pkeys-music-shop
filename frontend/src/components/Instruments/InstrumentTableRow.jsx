/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgPen, CgTrash } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

import '../../tables.css';

function InstrumentTableRow ({ backendURL, Instrument, getInstruments }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-instrument', { state: { Instrument } });
    }

    const handleDeleteClick = async () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this instrument.')) {
            try {
                const response = await fetch(`${backendURL}/api/delete-instrument/${Instrument.instrumentId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) {
                    if (response.status === 409) {
                        window.alert("This instrument is part of a rental order.\nIt cannot be deleted right now.")
                    }
                    throw new Error(`Error status: ${response.status}`);
                }
                await getInstruments();
                const data = await response.json();
                return data;
            } catch (err) {
                console.error("Error deleting instrument", err);
            }
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
            <td>{Instrument["Currently Rented"]}</td>
            <td><CgPen className="edit-button" onClick={handleEditClick} /></td>
            <td><CgTrash className="delete-button" onClick={handleDeleteClick} /></td>
        </tr>
    )
}

export default InstrumentTableRow;