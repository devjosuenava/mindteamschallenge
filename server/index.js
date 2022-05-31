const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs")
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin:'*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const User = db.user;
const Role = db.role;
const Account = db.account;
const Associate = db.associate

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Mind Teams application API." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/associate.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "superadmin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'superadmin' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
    }
  });
  User.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      const user = new User({
        fullName: "superadmin",
        email: "super@admin.com",
        password: bcrypt.hashSync("123", 8)
      });
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        Role.findOne(
          {
            name: "superadmin"
          },
          (err, role) => {
            user.role = role._id;
            user.save();
            console.log("added user: super@admin.com to Users collection");
          }
        );
      });
    }
  });
  Account.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Account({
        accountName: "Arkus Account",
        clientName: "Roberto Ramirez"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added account: Arkus to Accounts collection");
      });
    }
  });
}