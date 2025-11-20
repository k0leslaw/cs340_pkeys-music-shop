/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgTrash } from "react-icons/cg";

function AddInstrumentTableRow ({ handleDeleteAdditionalRow }) {
    return (
         <tr>
            <td>
                <select>
                    <option>Guitar</option>
                    <option>Trumpet</option>
                    <option>Keyboard</option>
                    <option>Clarinet</option>
                    <option>Violin</option>
                    <option>Drum Kit</option>
                </select>
            </td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="number"/></td>
            <td className="delete-additional-row-button" onClick={handleDeleteAdditionalRow}><CgTrash /></td>
        </tr>
    )
}

export default AddInstrumentTableRow;