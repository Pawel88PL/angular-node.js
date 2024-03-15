const pool = require('../config/dbConfig');

async function querySql(query, params) {
    const [rows, fields] = await pool.execute(query, params);
    return rows;
}

module.exports = {
    querySql
};
