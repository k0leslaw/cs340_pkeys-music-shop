/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgAdd } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InstrumentTableRow from "../../components/Instruments/InstrumentTableRow";

function Instruments ({ backendURL }) {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const addInstrument = () => {
        navigate('/add-instrument')
    }

    const getInstruments = async () => {
        try {
            const response = await fetch(`${backendURL}/api/instruments`);
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            const data = await response.json();
            setRows(data);
        } catch (err) {
            console.error("Error fetching instruments:", err);
        }
    }

    useEffect(() => {
        getInstruments();
    }, [backendURL])

    return (
        <div className="page">
            <div className='table-header'>
                <h1>Instruments</h1>
                <button className="new-row-button" onClick={addInstrument}><CgAdd /> New Instrument</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Instrument ID</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Model Name</th>
                        <th>Price/Week</th>
                        <th>Currently Rented</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => <InstrumentTableRow key={row.instrumentId} Instrument={row}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default Instruments;