module.exports = (app) => {
  const city = require("../controllers/policy_type.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findById/:id", city.findById);
  router.get("/getAllPolicies", city.findByPolicyName);
  router.get("/getAllEnablePolicies", city.findenablepolicy);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/policy_type", router);
};
