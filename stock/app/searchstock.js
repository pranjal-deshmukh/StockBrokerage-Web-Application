module.exports = {
    search() {
        var mysql = require('mysql');
        var dbconfig = require('../config/database');
        var connection = mysql.createConnection(dbconfig.connection);
        connection.query('USE ' + dbconfig.database);
    
        let list = window.document.getElementById('select_stock');

        connection.query(`Select Distinct Stock_Name From ${dbconfig.stocks_table} ORDER BY Stock_Name DESC`,
            function(err, results, fields) {
                if (err) throw err;

                for (let i = 0; i < results.length; i++) {
                    let opt = window.document.createElement('option');
                    opt.text = results[i].Stock_Name;
                    opt.value = results[i].Stock_Name;
                    list.add(opt);
                }

                return results;
            }
        );
    },
    getList() {
        var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
        var http = new XMLHttpRequest();
        const url = 'http://localhost:8081/api/getStockList';
        http.open('GET', url);
        http.send();
        console.log('ressss: ', http.responseText);
        return http.responseText;
    }
}