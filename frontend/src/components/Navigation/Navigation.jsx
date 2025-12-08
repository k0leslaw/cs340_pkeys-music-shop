/** https://react-icons.github.io/react-icons/icons/cg/ */
import { CgBrowse, CgPiano, CgUser } from "react-icons/cg";

import { Link } from 'react-router-dom';
import './Navigation.css';

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
            window.location.reload()
        } catch (err) {
            console.error("Error resetting sample data", err);
        }
        }
    }
    return (
        <nav className='nav-bar'>
            
            <div className='nav-links'>
                <img src="../logo-blue-black.png" className='logo'></img>
                <Link to="/">
                    <button className='nav-button'>Rental Orders<CgBrowse /></button>
                </Link>
                <Link to="/instruments">
                    <button className='nav-button inst-link'>Instruments<CgPiano /></button>
                </Link>
                <Link to="/customers">
                    <button className='nav-button'>Customers<CgUser /></button>
                </Link>
            </div>
            <button className='nav-button reset-button' onClick={resetSampleData}>RESET SAMPLE DATA</button>
        </nav>
    )
} 

export default Navigation;