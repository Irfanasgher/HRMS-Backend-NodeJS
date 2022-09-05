module.exports = (app) => {
  const city = require("../controllers/employee_info.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.post("/signUp", city.signUp);
  router.post("/login", city.LoginVerify);
  router.post("/empFanIn", city.empFanIn);
  router.get("/verify", authJwt.authenticateJWT, city.verify);
  router.get("/getSalaryByEmpId/:id", city.salaryCalculate);
  router.get("/findById/:id", authJwt.authenticateJWT, city.findById);
  router.get("/findAll", city.findall);
  router.get("/getEmpList", city.empList);
  router.get("/getEmpListForSalary", city.empListforSalary);
  router.get("/findEmpDetail/:id", city.empFanOut);
  router.put("/updateById/:id", city.updateById);
  router.put("/disableById/:id", city.disableById);
  router.put("/enableById/:id", city.enableById);

  app.use("/api/employee_info", router);
};
