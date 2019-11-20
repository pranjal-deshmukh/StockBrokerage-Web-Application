To run the StockExchange web app, first install the dependencies by running 'npm i' while in the StockExchange folder.
Once dependencies are installed, run 'npm start' or 'node index.js' while in the StockExchange folder. The service will run
on localhost on the port specified in index.js.

If getting mysql connection errors, in mysql run the script in mysqlConnectionFix.sql on the user accessing the db from node.
Then try to run the server again.

Be sure the username and password are correct for the mySQL instance running. Also be sure that the mySQL service is running.
The server can be tested using an app like Postman.

ex. req

GET http://localhost:8080/api/getLatestStockPrice

Header:
Content-Type    application/x-www-form-urlencoded

Body:
symbol  AMD