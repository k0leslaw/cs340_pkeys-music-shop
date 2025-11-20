/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgTrash } from "react-icons/cg";

function AddCustomerTableRow ({ handleDeleteAdditionalRow }) {
    return (
         <tr>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="number"/></td>
            <td className="delete-additional-row-button" onClick={handleDeleteAdditionalRow}><CgTrash /></td>
        </tr>
    )
}

export default AddCustomerTableRow;