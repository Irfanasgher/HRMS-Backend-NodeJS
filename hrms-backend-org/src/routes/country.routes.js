module.exports = (app) => {
  const city = require("../controllers/country.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.createCountry);
  router.get("/findById/:id", city.findById);
  router.get("/findAllCountries", city.findAllCountries);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/country", router);
};
