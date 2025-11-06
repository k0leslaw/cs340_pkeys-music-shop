function EditCustomerTableRow ({ Customer }) {
    return (
        <tr>    
            <td>{Customer.customerId}</td>
            <td>
                <input 
                type="text"
                value={Customer.firstName}/>
            </td>
            <td>
                <input 
                type="text"
                value={Customer.lastName}/>
            </td>
            <td>
                <input 
                type="text"
                value={Customer.email}/>
            </td>
            <td>
                <input 
                type="text"
                value={Customer.phone}/>
            </td>
        </tr>
    )
}

export default EditCustomerTableRow;