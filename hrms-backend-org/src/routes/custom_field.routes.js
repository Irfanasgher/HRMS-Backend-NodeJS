module.exports = (app) => {
  const city = require("../controllers/custom_field.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findAll", city.findAll);
  router.get("/getNamesOfCustomField", city.findNames);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/custom_field", router);
};
