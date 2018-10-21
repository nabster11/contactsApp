# Contacts
Contacts CRUD API. Node.js, Express, Sequelize, Postgresql, Mysql

### What platform I chose and why I chose it

* Node.js :- Simply because I'm interested in learning it at the moment. It's a quick way for delivering a full stack solution.
* PostgreSQL:- I believe that if the schema is known from the beginning, a nicely structured SQL is in most cases a better choice than NoSQL. PostgreSQL with JSONB seems to be beating MongoDB in its own game now as well, so why not use it.
* With that I chose Express and Sequelize as they provide the most flexibility when it comes to dealing with SQL.

### What features I completed

* Very simple database model
* API routes to CRUD operations
* Unit tests for each route
* Authentication - basic auth added
* paginated api to fetch atmost 10 contacts at a time.

### Setup for local

1. Downlaod and install MySQL 

2. Create databases for develpoment and test (assumed username and password for the database are root:root - can be modified in config/config.json):
    mysql -u root -proot -h localhost
    create schema contacts

3. Download and install Node.js (https://nodejs.org/download/) and npm (https://www.npmjs.com/package/download)

4. Clone git repository
   mkdir contactsApp
   cd contactsApp
   git clone 
   npm install

5. Run server:- npm start

6. Run automated tests : npm run test

7. Manual testing with Postman - the following URL has a collection of endpoint calls:
