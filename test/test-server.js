var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var models = require("../models");

var should = chai.should();
chai.use(chaiHttp);

describe("Contacts: ", function() {
  beforeEach("Clear the DB and add one item", function(done) {
    models.sequelize.sync({ force: true }).then(function() {
      models.Contacts.create({
        fullname: "testuser",
        email: "test@test.com",
        phonenumber: "12345",
        address: "test address"
      }).then(function() {
        done();
      });
    });
  });

  it("should connect to the server", function(done) {
    chai
      .request(server)
      .get("/api")
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("should list ALL entries on /contacts GET", function(done) {
    chai
      .request(server)
      .get("/api/contacts")
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("email");
        res.body[0].should.have.property("fullname");
        //res.body[0].id.should.equal('1');
        res.body[0].email.should.equal("test@test.com");
        res.body[0].fullname.should.equal("test");
        done();
      });
  });

  it("should list a SINGLE contact on /contact/<id> GET", function(done) {
    chai
      .request(server)
      .get("/api/contact/1/")
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("email");
        res.body.should.have.property("fullname");
        res.body.should.have.property("id");
        //res.body.id.should.equal('1');
        res.body.email.should.equal("test@test.com");
        res.body.fullname.should.equal("test");
        done();
      });
  });

  it("should ADD a single contact on /contacts POST", function(done) {
    chai
      .request(server)
      .post("/api/contacts")
      .type("form")
      .send({ email: "blob@blob.com", fullname: "test" })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("email");
        res.body.should.have.property("fullname");
        res.body.should.have.property("id");
        res.body.email.should.equal("blob@blob.com");
        res.body.fullname.should.equal("test");
        done();
      });
  });

  it("should UPDATE a single contact on /contact/<id> PUT", function(done) {
    chai
      .request(server)
      .put("/api/contact/1")
      .type("form")
      .send({ email: "blob2@blob.com", fullname: "test2" })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("email");
        res.body.should.have.property("fullname");
        res.body.should.have.property("id");
        res.body.email.should.equal("blob2@blob.com");
        res.body.fullname.should.equal("test2");
        done();
      });
  });

  it("should DELETE a single contact on /contact/<id> DELETE", function(done) {
    chai
      .request(server)
      .delete("/api/contact/1")
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        if (res.body && res.body[0]) {
          res.body[0].should.have.property("id");
          res.body[0].id.should.not.equal("1");
        }
        done();
      });
  });
});
