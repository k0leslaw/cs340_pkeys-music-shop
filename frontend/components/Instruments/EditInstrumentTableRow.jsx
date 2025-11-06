function EditInstrumentTableRow ({ Instrument }) {
    return (
        <tr>    
            <td>{Instrument.instrumentId}</td>
            <td>
                <select defaultValue={Instrument.type}>
                    <option>Guitar</option>
                    <option>Trumpet</option>
                    <option>Keyboard</option>
                    <option>Clarinet</option>
                    <option>Violin</option>
                    <option>Drum Kit</option>
                </select>
            </td>
            <td>
                <input 
                type="text"
                value={Instrument.brand}/>
            </td>
            <td>
                <input 
                type="text"
                value={Instrument.modelName}/>
            </td>
            <td>
                <input 
                type="text"
                value={Instrument.pricePerWeek}/>
            </td>
            <td>
                <select defaultValue={Instrument.type}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </td>
        </tr>
    )
}

export default EditInstrumentTableRow;