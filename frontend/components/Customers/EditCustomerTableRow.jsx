function EditCustomerTableRow ({ Customer }) {
    return (
        <tr>    
            <td>{Customer.customerId}</td>
            <td>
                <input 
                type="text"
                defaultValue={Customer.firstName}/>
            </td>
            <td>
                <input 
                type="text"
                defaultValue={Customer.lastName}/>
            </td>
            <td>
                <input 
                type="text"
                defaultValue={Customer.email}/>
            </td>
            <td>
                <input 
                type="text"
                defaultValue={Customer.phone}/>
            </td>
        </tr>
    )
}

export default EditCustomerTableRow;