# Contacts App 
Contacts CRUD API. Node.js, Express, Sequelize, Postgresql, Mysql

### Where is it hosted
https://stark-refuge-37192.herokuapp.com/

### What platform I chose and why I chose it

* Node.js / Express :- I'm interested in learning it at the moment.
* PostgreSQL:- I believe that if the schema is known from the beginning, a nicely structured SQL is in most cases a better choice than NoSQL.
* MySQL:- I choose this for local develpoment.
* Sequelize:- As it provides the most flexibility when it comes to dealing with SQL.

### Manual Testing
Download the postman app (https://www.getpostman.com/apps)

If you wish to do the manual testing, you can do so by importing this Postman collection:- https://www.getpostman.com/collections/4d13547f2f175f8ccd33

### Features
* Very simple database model
* API routes to CRUD operations
  * Adding a new contact:
    ```POST /api/contacts```
  * Deleting a new contact:
     ```DELETE /api/contact/<id>```
  * Updating an existing contact:
    ```PUT /api/contacts/<id>```
  * Get a contact by id:
    ```GET /api/contacts/<id>```

* Searching a contact by fullname / email        
    ```GET /api/contacts?fullname=test test```

    ```GET /api/contacts?email=test@test.com```
* Paginated api to fetch atmost 10 contacts at a time : ```GET /api/contacts/page/<page-number>```
* Unit tests for each route
* Authentication - basic auth added

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
