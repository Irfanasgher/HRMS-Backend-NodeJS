module.exports = (app) => {
  const city = require("../controllers/user_role.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.createUserRole);
  //   router.get("/findAll", city.findAll);
  router.get("/findByEmpId/:id", city.getEmpPermissions);

  //   router.put("/update/:id", city.update);

  app.use("/api/user_role", router);
};
