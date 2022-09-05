module.exports = (app) => {
  const city = require("../controllers/company_defination.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.createCompanyDef);
  router.get("/getCompanyList", city.getCompanyList);
  router.get(
    "/findByOrganizationId/:id",

    city.findByOrganizationID
  );
  router.get(
    "/getAllDetailsOfCompany/:id",

    city.companyFanOut
  );
  router.put(
    "/updateByid/:id",

    city.updateOrganizationById
  );
  router.put(
    "/disableById/:id",

    city.disableCompanyById
  );
  router.put("/enableById/:id", city.enableCompany);

  app.use("/api/company_defination", router);
};
