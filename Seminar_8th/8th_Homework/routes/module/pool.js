/*
 Default module
*/
const async = require('async');

/*
 Custom module
*/
const pool = require('../../config/dbPool.js');

/*
 Modularize DB Connection
*/
module.exports = {
    // Params : 0
    queryParamCnt_0 : async (...args) => {
        const query = args[0];
        let result;
        try {
            var connection = await pool.getConnection();
            result = await connection.query(query) || null;
        }
        catch(err) {
            next(err);
        }
        finally {
            pool.releaseConnection(connection);
            return result;
        }
    },
    // Params : 1
    queryParamCnt_1 : async (...args) => {
        const query = args[0];
        const data1 = args[1];
        let result;
        try {
            var connection = await pool.getConnection();
            result = await connection.query(query, data1) || null;
        }
        catch(err) {
            next(err);
        }
        finally {
            pool.releaseConnection(connection);
            return result;
        }
    },
    // Params : 2
    queryParamCnt_2 : async (...args) => {
        const query = args[0];
        const data1 = args[1];
        const data2 = args[2];
        let result;
        try {
            var connection = await pool.getConnection();
            result = await connection.query(query, [data1, data2]) || null;
        }
        catch(err) {
            next(err);
        }
        finally {
            pool.releaseConnection(connection);
            return result;
        }
    },
    // Params : 3
    queryParamCnt_3 : async (...args) => {
        const query = args[0];
        const data1 = args[1];
        const data2 = args[2];
        const data3 = args[3];
        let result;
        try {
            var connection = await pool.getConnection();
            result = await connection.query(query, [data1, data2, data3]) || null;
        }
        catch(err) {
            next(err);
        }
        finally {
            pool.releaseConnection(connection);
            return result;
        }
    },
     // Params : 4
     queryParamCnt_4 : async (...args) => {
        const query = args[0];
        const data1 = args[1];
        const data2 = args[2];
        const data3 = args[3];
        const data4 = args[4];
        let result;
        try {
            var connection = await pool.getConnection();
            result = await connection.query(query, [data1, data2, data3, data4]) || null;
        }
        catch(err) {
            next(err);
        }
        finally {
            pool.releaseConnection(connection);
            return result;
        }
    }
};
