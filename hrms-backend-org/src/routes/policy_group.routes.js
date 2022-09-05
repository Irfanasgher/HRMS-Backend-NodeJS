module.exports = (app) => {
  const city = require("../controllers/policy_group.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findById/:id", city.findById);
  router.get("/byGrade/:name", city.forEmpModule);
  router.get("/getAllPolicies", city.findAllPolicyGroups);
  router.get("/getAllEnablePolicies", city.findenablepolicy);
  router.get("/findBenefitGroup", city.findBenefitGroup);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/policy_group", router);
};
