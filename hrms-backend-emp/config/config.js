// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "",
//   DB: "hr-employee",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

module.exports = {
  HOST: "mysql-devdbsrv.mysql.database.azure.com",
  USER: "evdbadmin@mysql-devdbsrv.mysql.database.azure.com",
  PASSWORD: "0s3Aq&0DN3zD5QPC",
  DB: "hrms-employee-prod",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // BASEURL: "http://localhost:5000",
  BASEURL: "https://hrms-back-org-prod.azurewebsites.net",
  ATD_BASEURL: "https://hrms-back-atd-prod.azurewebsites.net",
  PAYROLL_BASEURL: "https://hrms-back-pay-prod.azurewebsites.net",
  RBAC_BASEURL: "https://hrms-back-rabc-prod.azurewebsites.net",
};
