require('dotenv').config();
const ONID = process.env.ONID;
const DB_PWORD = process.env.DB_PWORD;

/**
 * Citation for the following code:
 * Date 11/05/2025
 * Copied from Exploration - Web Application Technology:
 * https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
 */

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : `cs340_${ONID}`,
    password          : `${DB_PWORD}`,
    database          : `cs340_${ONID}`,
    multipleStatements: true
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;