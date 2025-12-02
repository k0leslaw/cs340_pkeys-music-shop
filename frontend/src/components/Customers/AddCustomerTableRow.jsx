/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgTrash } from "react-icons/cg";

function AddCustomerTableRow ({ row, updateRow, handleDeleteAdditionalRow }) {
    const handleChange = (field) => (e) => {
        updateRow(row.id, field, e.target.value);
    }
    return (
         <tr>
            <td><input type="text" onChange={handleChange("firstName")}/></td>
            <td><input type="text" onChange={handleChange("lastName")}/></td>
            <td><input type="text" onChange={handleChange("email")}/></td>
            <td><input type="number" onChange={handleChange("phone")}/></td>
            <td className="delete-additional-row-button" onClick={handleDeleteAdditionalRow}><CgTrash /></td>
        </tr>
    )
}

export default AddCustomerTableRow;