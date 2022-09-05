const db = require("./models");
var cron = require("node-cron");

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
  "http://localhost:3000",
  "http://localhost:5000",
  "https://hrms-backend.azurewebsites.net",
  "https://hrms-frontend.azurewebsites.net",
  "https://hrms-front-prod.azurewebsites.net",
  "https://hrms-back-emp-prod.azurewebsites.net",
  "https://hrms-back-atd-prod.azurewebsite.net",
];

app.use(
  cors({
    credentials: true,
    // allowedHeaders: [
    //   "http://localhost:3000",
    //   "http://localhost:5000",
    //   "https://hrms-backend.azurewebsites.net",
    // ],
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
  res.json({ message: "Welcome to hrms-employee " });
});

require("./src/routes/address_type.routes")(app);
require("./src/routes/employee_info.routes")(app);
require("./src/routes/certifications.routes")(app);
require("./src/routes/dependent_type.routes")(app);
require("./src/routes/document_type.routes")(app);
require("./src/routes/employee_address.routes")(app);
require("./src/routes/employee_allocation.routes")(app);
require("./src/routes/employee_benefit.routes")(app);
require("./src/routes/employee_certifications.routes")(app);
require("./src/routes/employee_dependent.routes")(app);
require("./src/routes/employee_document.routes")(app);
require("./src/routes/employee_leave.routes")(app);
require("./src/routes/employee_loan.routes")(app);
require("./src/routes/employee_referrence.routes")(app);
require("./src/routes/referrence_type.routes")(app);
require("./src/routes/authentication_type.routes")(app);
//----------
require("./src/routes/employee_type.routes")(app);
require("./src/routes/employee_authentication.routes")(app);
require("./src/routes/allocation_type.routes")(app);
require("./src/routes/work_experiance.routes")(app);
require("./src/routes/degree.routes")(app);
require("./src/routes/education.routes")(app);
//cron job
// cron.schedule("* * 1 Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec *", () => {
//   console.log("running on 1st of every month");
// });
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
