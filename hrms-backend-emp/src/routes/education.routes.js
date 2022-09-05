module.exports = (app) => {
  const city = require("../controllers/education.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findByEmployeeId/:id", city.findById);
  router.get("/findAll", city.findall);
  router.put("/updateById/:id", city.updateById);
  router.put("/disableById/:id", city.disableById);
  router.put("/enableById/:id", city.enableById);

  app.use("/api/education", router);
};
