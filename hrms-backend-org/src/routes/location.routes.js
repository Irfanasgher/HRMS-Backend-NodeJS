module.exports = (app) => {
  const city = require("../controllers/location.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findById/:id", city.findByid_location);
  router.get("/findByCityId/:id", city.findBycity_id);
  router.get("/findByTehsilId/:id", city.findBytehsil_id);
  router.get("/findByCompanyId/:id", city.findByCompanyid);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/location", router);
};
