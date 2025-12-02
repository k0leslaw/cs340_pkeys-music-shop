/**
 * Citation for the following code:
 * Date 11/05/2025
 * Adapted from Exploration - Web Application Technology:
 * https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
 */

function Navigation({ backendURL }) {
    const resetSampleData = async () => {
        if (window.confirm('Press OK to confirm resetting the database.\nThis cannot be undone.')){
            try {
            const response = await fetch(`${backendURL}/api/reset-database`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            // update the table rows
            //await getRentalOrders();
            //await getCustomers();
            //await getInstruments();
            //await getRentedItems();
            window.location.reload()
        } catch (err) {
            console.error("Error resetting sample data", err);
        }
        }
    }
    return (
        <nav>
            <img src="../logo.png" width="50px"></img>
            <a href="/">Rental Orders</a>
            <a href="/instruments">Instruments</a>
            <a href="/customers">Customers</a>
            <br/>
            <br/>
            <button onClick={resetSampleData}>RESET SAMPLE DATA</button>
        </nav>
    )
} 

export default Navigation;