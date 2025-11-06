/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgTrash } from "react-icons/cg";

function AddRentalOrderTableRow ({ handleDeleteAdditionalRow }) {
    return (
        <tr>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="date"/></td>
            <td><input type="date"/></td>
            <td>N/A</td>
            <td>
                <select>
                    <option>Open</option>
                    <option>Active</option>
                    <option>Late</option>
                    <option>Complete</option>
                </select>
            </td>
            <td className="delete-additional-row-button" onClick={handleDeleteAdditionalRow}><CgTrash /></td>
        </tr>
    )
}

export default AddRentalOrderTableRow;