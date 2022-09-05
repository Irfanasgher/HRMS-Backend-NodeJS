module.exports = (app) => {
  const city = require("../controllers/unit.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findById/:id", city.findById);
  router.get("/findBycompanyId/:id", city.findBycompany_id);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/unit", router);
};
