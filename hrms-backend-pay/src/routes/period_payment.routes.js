module.exports = (app) => {
  const city = require("../controllers/period_payment.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.createPeriodPayment);
  router.get("/findAll", city.findAll);
  // router.get("/findByCityId/:id", city.findByCityId);
  router.put("/update/:id", city.update);
  // router.put("/disableById/:id", city.disableCityById);
  // router.put("/enableById/:id", city.enableCityById);

  app.use("/api/period_payment", router);
};
