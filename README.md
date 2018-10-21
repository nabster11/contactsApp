# Contacts App 
Contacts CRUD API. Node.js, Express, Sequelize, Postgresql, Mysql

### What platform I chose and why I chose it

* Node.js / Express :- I'm interested in learning it at the moment.
* PostgreSQL:- I believe that if the schema is known from the beginning, a nicely structured SQL is in most cases a better choice than NoSQL.
* Sequelize:- As it provides the most flexibility when it comes to dealing with SQL.

### What features I completed

* Very simple database model
* API routes to CRUD operations
* Unit tests for each route
* Authentication - basic auth added
* Paginated api to fetch atmost 10 contacts at a time.

### Setup for local

1. Downlaod and install MySQL 

2. Create databases for develpoment and test (assumed username and password for the database are root:root - can be modified in config/config.json):
    ```
    mysql -u root -proot -h localhost
    create schema contacts;
    ```
3. Download and install Node.js (https://nodejs.org/download/) and npm (https://www.npmjs.com/package/download)

4. Clone git repository
   ```
   mkdir contactsApp
   cd contactsApp
   git clone https://github.com/nabster11/contactsApp
   npm install
   ```
5. Run server:- 
   ``` npm start ```

6. Run automated tests : 
   ``` npm run test ```

7. Manual testing with Postman - the following URL has a collection of endpoint calls:-
https://www.getpostman.com/collections/4d13547f2f175f8ccd33
