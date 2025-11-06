function EditRentalOrderTableRow ({ RentalOrder }) {
    return (
        <tr>
            <td>{RentalOrder.rentalOrderId}</td>
            <td><input type="text"
                       value={RentalOrder.firstName}/></td>
            <td><input type="text"
                       value={RentalOrder.lastName}/></td>
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
        </tr>
    )
}

export default EditRentalOrderTableRow;