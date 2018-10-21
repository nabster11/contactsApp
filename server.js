// Get the packages we need
var express = require("express");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var models = require("./models");
var routes = require("./routes");
var auth = require("./auth/auth");

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Setting up Basic-auth
app.use(auth);

// sequelize initialization
var env = process.env.NODE_ENV || "development";

var sequelize =
  env === "production"
    ? new Sequelize(
        "your-production-postgresql url"
      )
    : new Sequelize("mysql://root:root@localhost:3306/contacts");

// check database connection
sequelize.authenticate().then(function(errors) {
  console.log(errors);
});

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get("/", function(req, res) {
  res.json({ message: "Server is up!" });
});

// Register all our routes with /api
app.use("/api", router);

var contactsRoute = router.route("/contacts");
var contactRoute = router.route("/contact/:contact_id");
var pageinateRoute = router.route("/contacts/page/:page_id");

// Route for saving contacts and search it by name, email
contactsRoute.get(routes.getAllContacts);
contactsRoute.post(routes.saveContact);

// delete, update, get contact for each id
contactRoute.get(routes.getContactById);
contactRoute.put(routes.updateContactById);
contactRoute.delete(routes.deleteContact);

// pagination support for fetching contacts
pageinateRoute.get(routes.pageContact);

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Start the server
models.sequelize
  .sync
  //	{force: true}
  ()
  .then(function() {
    var server = app.listen(/*app.get('port')*/ port, function() {
      console.log("Express server listening on port " + server.address().port);
    });
  });

module.exports = app;
