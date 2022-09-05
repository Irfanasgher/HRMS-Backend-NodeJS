module.exports = (app) => {
  const city = require("../controllers/organization_defination.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findById/:id", city.findById);
  router.get("/findAllOrganization", city.getAll);
  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/organization_defination", router);
};
