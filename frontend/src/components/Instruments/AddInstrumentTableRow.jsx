/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgTrash } from "react-icons/cg";

import { useState } from "react";

function AddInstrumentTableRow ({ row, updateRow, handleDeleteAdditionalRow }) {
    const handleChange = (field) => (e) => {
        updateRow(row.id, field, e.target.value);
    }

    return (
         <tr>
            <td>
                <select onChange={handleChange("type")}>
                    <option>Guitar</option>
                    <option>Trumpet</option>
                    <option>Keyboard</option>
                    <option>Clarinet</option>
                    <option>Violin</option>
                    <option>Drum Kit</option>
                </select>
            </td>
            <td><input type="text" onChange={handleChange("brand")}/></td>
            <td><input type="text" onChange={handleChange("modelName")}/></td>
            <td><input type="number" onChange={handleChange("pricePerWeek")}/></td>
            <td className="delete-additional-row-button" onClick={handleDeleteAdditionalRow}><CgTrash /></td>
        </tr>
    )
}

export default AddInstrumentTableRow;