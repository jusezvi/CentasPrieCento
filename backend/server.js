const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", 
    httpOnly: true
  })
);

const db = require("./models");
const { user, userCategory } = require("./models");
const UserCategory = require("./models/userCategory.model");

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


app.get("/", (req, res) => {
  res.json({ message: "Welcome to CPC application." });
});


app.post("/insertBudget/:budgetInfo", (req, res) => {
  console.log(JSON.parse(req.params.budgetInfo))
  var data = JSON.parse(req.params.budgetInfo);
  var budget = new Budget(data);
  var result = budget.save();
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

app.delete("/delBudget/:itemID", async (req, res) => {
  var itemID = req.params.itemID;

  Budget.remove({ _id: itemID }, {
    justOne: true
  }).then(x => {
    console.log('Istrinta')
  })

})

app.put("/updateBudget/:itemID", async (req, res) => {
  var itemID = req.params.itemID;
  Budget.updateOne({ _id: itemID }, {
    sum: req.body.sum,
    name: req.body.name,
    date: req.body.date,
    category: req.body.category
  }).then(x => {
    console.log('edit')
  })
})

app.delete("/delUserCategory/:userCategoryID", async (req, res) => {
  var userCategoryID = req.params.userCategoryID;
  UserCategory.remove({ _id: userCategoryID }, {
    justOne: true
  }).then(x => {
    console.log('Istrinta')
  })
})

app.put("/updateUserCategory/:userCategoryID", async (req, res) => {
  var userCategoryID = req.params.userCategoryID;
  UserCategory.updateOne({ _id: userCategoryID }, {
    limit: req.body.limit,
  }).then(x => {
    console.log('edit')
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

app.get("/getUserCategory/:userID", async (req, res) => {
  var userID = req.params.userID;
  UserCategory.find({ user: userID }, (err, dataRes) => {
    if (!err) {
      res.send({ data: dataRes });
    } else {
      return console.log('Failed');
    }
  })
});


require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


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

