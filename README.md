Team: Webcoders
Members: Sheetal Kadam(sak170006), Trey Lewis (tdl190000), Pranjal Deshmukh(psd180000)

This project includes our Stock Brokerage website and web application, and Stock Exchange web application. Npm and NodeJS are both required to run the applications.

The Stock Exchange application is located in the "StockExchange" folder. You must first install the dependencies for the application. To do this, open a terminal window inside the "StockExchange" folder and run 'npm i' or 'npm install'. Once the dependencies have been installed run the application by executing the command 'npm start' or 'node index.js'. The exchange is available on localhost port 8081 (http://localhost:8081)

The Stock Brokerage website and web app are located in the "stock" folder. You must first install the dependencies for the application. To do this, open a terminal window inside the "stock" folder and run 'npm i' or 'npm install'. Once the dependencies have been installed run the application by executing the command 'node server.js'. Access the website in the browser at https://localhost:8080

Finally, a mySQL database is used as the backend database for this project. Install mySQL and login with your user account and run the mySQL service on the machine. The brokerage database must be created. We have made a file called Starter.sql that has the queries to run to create the database. Run these and create the brokerage database. We have also included a file called InitialData.csv that is used to populate the database with data for 100 stocks. You can use the import wizard in mySQL to import the data into the database. Finally, for the user account that will be used to connect to mySQL from the applications, run the query from the file mysqlConnectionFix.sql, replacing the username and password with your correct login, to give the user account the appropriate permissions to make the connection. Finally, at the top of the ./StockExchange/api.js file (lines 8-14) and in the ./stock/config/database.js file, change the 'user' and 'password' properties to be those corresponding to the account modified in mySQL. Once these steps are done, connections to the database can be made from the web applications.

Once everything is running, visit https://localhost:8080 in your browser to use the application.
