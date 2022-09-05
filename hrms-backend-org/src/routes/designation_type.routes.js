module.exports = (app) => {
  const city = require("../controllers/designation_type.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/dropDown", city.findFordropdown);
  router.get("/findAllDesignation", city.findAll);
  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/designation_type", router);
};
