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
                defaultValue={Instrument.brand}/>
            </td>
            <td>
                <input 
                type="text"
                defaultValue={Instrument.modelName}/>
            </td>
            <td>
                <input 
                type="text"
                defaultValue={Instrument.pricePerWeek}
                min={0}/>
            </td>
        </tr>
    )
}

export default EditInstrumentTableRow;