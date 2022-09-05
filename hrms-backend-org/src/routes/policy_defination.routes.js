module.exports = (app) => {
  const city = require("../controllers/policy_defination.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/createPlan", city.createPlan);
  router.post("/createPolicy", city.createPolicy);
  router.post("/getByPolicyIds", city.findByPolicyIds);
  router.get("/findAll", city.getAllPolicies);
  router.get("/getAllPlans", city.getAllPlans);
  router.get("/findByCompanyId/:id", city.findBycompany_id);
  router.get("/getByPolicyId/:id", city.findByPolicyId);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/policy_defination", router);
};
