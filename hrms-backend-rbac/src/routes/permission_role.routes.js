module.exports = (app) => {
  const city = require("../controllers/permission_role");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.createPermission);
  router.get("/findAllPermissions", city.findAll);

  router.post("/delete", city.updateCityById);

  app.use("/api/permission_role", router);
};
