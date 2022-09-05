module.exports = (app) => {
  const city = require("../controllers/allocation_type.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);

  router.get("/findAll", city.findall);
  router.get("/findByName/:name", city.findByName);
  router.put("/updateById/:id", city.updateById);
  router.put("/disableById/:id", city.disableById);
  router.put("/enableById/:id", city.enableById);

  app.use("/api/allocation_type", router);
};
