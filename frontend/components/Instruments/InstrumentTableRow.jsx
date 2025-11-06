import { useNavigate } from 'react-router-dom';

import '../../style/tables.css';

function InstrumentTableRow ({ Instrument }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-instrument', { state: { Instrument } });
    }
    return (
        <tr className="table-data-row" onClick={handleEditClick}>
            <td>{Instrument.instrumentId}</td>
            <td>{Instrument.type}</td>
            <td>{Instrument.brand}</td>
            <td>{Instrument.modelName}</td>
            <td>{Instrument.pricePerWeek}</td>
            <td>-</td>
        </tr>
    )
}

export default InstrumentTableRow;