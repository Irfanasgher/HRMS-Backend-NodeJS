module.exports = (app) => {
  const city = require("../controllers/increment_type.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  //   router.post("/", city.createPeriodPayment);
  router.get("/findAll", city.findAll);
  // router.get("/findByCityId/:id", city.findByCityId);
  // router.put("/updateCityByid/:id", city.updateCityById);
  // router.put("/disableById/:id", city.disableCityById);
  // router.put("/enableById/:id", city.enableCityById);

  app.use("/api/increment_type", router);
};
