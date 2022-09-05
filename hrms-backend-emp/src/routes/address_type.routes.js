module.exports = (app) => {
  const city = require("../controllers/address_type.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.addressType);
  router.get("/findById/:id", city.findById);
  router.get("/findAll", city.findall);
  router.put("/updateById/:id", city.updateById);
  router.put("/disableById/:id", city.disableById);
  router.put("/enableById/:id", city.enableById);

  app.use("/api/address_type", router);
};
