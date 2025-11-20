import '../../tables.css';
import EditInstrumentTableRow from '../../components/Instruments/EditInstrumentTableRow';

import { useNavigate, useLocation } from "react-router-dom";

function EditInstrument ({ backendURL }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { Instrument } = location.state || {};

    const handleCancel = () => {
        navigate('/instruments');
    }

    const handleSubmit = () => {
        navigate('/instruments');
    }

    const handleDelete = () => {
        if (window.confirm('This cannot be undone. Press OK to confirm deleting this instrument.')) {
            navigate('/instruments');
        } 
    }

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Edit Instrument</h1>
                <button className="new-row-button" onClick={handleCancel}>Cancel</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Instrument ID</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Model Name</th>
                        <th>Price/Week</th>
                    </tr>
                </thead>
                <tbody>
                    <EditInstrumentTableRow Instrument={Instrument} />
                </tbody>
            </table>
            <button className='submit-button' onClick={handleDelete}>Delete</button>
            <button className='submit-button' onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default EditInstrument;