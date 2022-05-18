const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./models");
const Role = db.role;
const Category = db.category;
const Type = db.type;

db.mongoose
  .connect(`${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
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
  res.json({ message: "Welcome to CPC application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Category({
        name: "Namai"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'namai' to Category collection");
      });

      new Category({
        name: "Maistas"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Maistas' to Category collection");
      });

      new Category({
        name: "Automobilis"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Automobilis' to Category collection");
      });

      new Category({
        name: "Pramogos"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Pramogos' to Category collection");
      });

      new Category({
        name: "Nenumatytos išlaidos"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Nenumatytos išlaidos' to Category collection");
      });

      new Category({
        name: "Kita"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Kita' to Category collection");
      });
    }
  });
  
  Type.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Type({
        name: "Pajamos"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'pajamos' to Type collection");
      });

      new Type({
        name: "Išlaidos"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'išlaidos' to Type collection");
      });
    }
  });


}

