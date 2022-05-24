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
const { user, userCategory } = require("./models");
const UserCategory = require("./models/userCategory.model");
//const Budget = require("./models/budget.model");
const Role = db.role;
const Category = db.category;
const Type = db.type;
const Budget = db.budget;

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

// ------------------------------------------------------
// INSERT NEW BUDGET
// ------------------------------------------------------
app.post("/insertBudget/:budgetInfo", (req, res) => {
  console.log(JSON.parse(req.params.budgetInfo))
  var data = JSON.parse(req.params.budgetInfo);
  var budget = new Budget(data);
  var result = budget.save();
})

// ------------------------------------------------------
// GET ALL CATEGORY
// ------------------------------------------------------
app.get("/getBudget/:userID", async (req, res) => {
  var userID = req.params.userID;
  // if (userID == null) {
  //   return console.log('Opss userID not found');
  // }
  // ------------------------------------------------------
  // GET ALL
  // ------------------------------------------------------
  Budget.find({ user: userID }, (err, dataRes) => {
    if (!err) {
      res.send({ data: dataRes });
    } else {
      return console.log('Failed');
    }
  })


})

app.delete("/delBudget/:itemID", async (req, res) => {
  var itemID = req.params.itemID;

  Budget.remove({ _id: itemID }, {
    justOne: true
  }).then(x => {
    console.log('Istrinta')
  })

})

app.get("/getBudget/:userID", async (req, res) => {
  var userID = req.params.userID;
  Budget.find({ user: userID }, (err, dataRes) => {
    if (!err) {
      res.send({ data: dataRes });
    } else {
      return console.log('Failed');
    }
  })
})

app.get("/getCategory/", async (req, res) => {
  Category.find((err, dataRes) => {
    if (!err) {
      res.send({ data: dataRes });
    } else {
      return console.log('Failed');
    }
  })
});

app.post("/insertUserCategory/:info", (req, res) => {
  console.log(JSON.parse(req.params.info))
  var data = JSON.parse(req.params.info);
  var userCategory = new UserCategory(data);
  var result = userCategory.save();
})

app.get("/getUserCategory/", async (req, res) => {
  UserCategory.find((err, dataRes) => {
    if (!err) {
      res.send({ data: dataRes });
    } else {
      return console.log('Failed');
    }
  })
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

