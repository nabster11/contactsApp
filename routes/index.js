var models = require("../models");

// Handler for fetching a contact by ID
exports.getContactById = function(req, res) {
  models.Contacts.findAll({
    where: {
      id: req.params.contact_id
    }
  }).then(function(contact) {
    res.json(contact[0]);
  });
};

// Handler for fetching contacts with exact macth on name / email
exports.getAllContacts = function(req, res) {
  const fullname = req.query.fullname,
    email = req.query.email;

  var whereClause = {};

  if (fullname) whereClause.fullname = fullname;
  if (email) whereClause.email = email;

  models.Contacts.findAndCountAll(
    whereClause.length === 0 ? {limit: 10, offset: 0} : { limit: 10, offset: 0, where: whereClause }
  ).then(function(contacts) {
    // The default limit search is 10
    res.json(contacts);
  });
};

// Handler for saving a contact
exports.saveContact = function(req, res) {
  models.Contacts.create({
    fullname: req.body.fullname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    contact: req.body.contact
  })
    .then(function(contacts) {
      res.json(contacts.dataValues);
    })
    .catch(function(error) {
      console.log("ops: " + error);
      res.status(500).json({ error: "error" });
    });
};

// Handler for updating a contact by ID
exports.updateContactById = function(req, res) {
  models.Contacts.update(
    {
      fullname: req.body.fullname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      contact: req.body.contact
    },
    {
      where: {
        id: req.params.contact_id
      }
    }
  )
    .then(function(contacts) {
      //res.json(contacts.dataValues);
      //res.json(models.Contacts.findById(req.params.contact_id));
      models.Contacts.findAll({
        where: {
          id: req.params.contact_id
        }
      }).then(function(contact) {
        res.json(contact[0]);
      });
    })
    .catch(function(error) {
      console.log("ops: " + error);
      res.status(500).json({ error: "error" });
    });
};

// Handler for deleting a contact
exports.deleteContact = function(req, res) {
  models.Contacts.destroy({
    where: {
      id: req.params.contact_id
    }
  })
    .then(function(contacts) {
      models.Contacts.findAll().then(function(contacts) {
        res.json(contacts);
      });
    })
    .catch(function(error) {
      console.log("ops: " + error);
      res.status(500).json({ error: "error" });
    });
};

function isInt(n) {
  return n % 1 === 0;
}

// Handler for pagination
exports.pageContact = function(req, res) {
  let limit = 10; // number of records per page
  let offset = 0;
  let page = req.params.page_id;

  // sanity checks
  if (!Number(page))
    res
      .status(400)
      .send("Bad request, page number should be a valid positive number");
  if (page < 1)
    res
      .status(400)
      .send("Bad request, page number should be a positive number expect 0");
  if (!isInt(page)) {
    res
      .status(400)
      .send("Bad request, page number should not be a floating number");
  }

  models.Contacts.count()
    .then(count => {
      let pages = Math.ceil(count / limit);
      offset = limit * (page - 1);
      models.Contacts.findAll({
        limit: limit,
        offset: offset,
        $sort: { id: 1 }
      }).then(users => {
        res
          .status(200)
          .json({ data: users, totalCount: count, totoalPages: pages });
      });
    })
    .catch(function(error) {
      res.status(500).send("Internal Server Error");
    });
};
