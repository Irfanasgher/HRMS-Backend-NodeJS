module.exports = (app) => {
  const city = require("../controllers/field_option.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findByCustomFieldId/:id", city.findBycustom_field_id);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/field_option", router);
};
