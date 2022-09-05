module.exports = (app) => {
  const city = require("../controllers/mapping_policy_group.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findByGroupId/:id", city.findByGroupId);
  router.get("/findByCompanyId/:id", city.findCompanyPolicies);
  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/mapping_policy_group", router);
};
