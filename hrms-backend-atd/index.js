const db = require("./models");

const authConfig = require("./config/authConfig");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

var allowedOrigins = [
  "https://hrms-frontend.azurewebsites.net",
  "http://localhost:3000",
  "http://localhost:5000",
  "https://hrms-backend.azurewebsites.net",
  "https://hrms-front-prod.azurewebsites.net",
  "https://hrms-back-emp-prod.azurewebsites.net",
  "https://hrms-back-atd-prod.azurewebsite.net",
];
app.use(
  cors({
    credentials: true,

    methods: ["GET", "PUT", "POST", "DELETE"],
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
// app.use(
//   cors({
//     credentials: true,
//   })
// );
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to hrms attendence" });
});

require("./src/routes/public_holiday.routes")(app);
require("./src/routes/break_type.routes")(app);
require("./src/routes/leave_type.routes")(app);
require("./src/routes/seasonal_shift.routes")(app);
require("./src/routes/regular_shift.routes")(app);
require("./src/routes/time_slot.routes")(app);
require("./src/routes/break_bank.routes")(app);
require("./src/routes/leave_bank.routes")(app);
require("./src/routes/over_time.routes")(app);
require("./src/routes/over_time.routes")(app);
require("./src/routes/attendence.routes")(app);
require("./src/routes/punch_machine.routes")(app);
require("./src/routes/machine_log.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
