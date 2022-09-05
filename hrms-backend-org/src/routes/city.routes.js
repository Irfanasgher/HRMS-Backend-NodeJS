module.exports = (app) => {
  const city = require("../controllers/city.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.createCity);
  router.get("/findByStateId/:id", city.findByStateId);
  router.get("/findByCityId/:id", city.findByCityId);
  router.put("/updateCityByid/:id", city.updateCityById);
  router.put("/disableById/:id", city.disableCityById);
  router.put("/enableById/:id", city.enableCityById);

  app.use("/api/city", router);
};
