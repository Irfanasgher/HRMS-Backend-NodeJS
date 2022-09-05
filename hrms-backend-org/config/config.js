// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "",
//   DB: "hrms-dev-test",
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
  DB: "hrms-org-prod",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  BASEURL: "https://hrms-back-emp-prod.azurewebsites.net",
  // BASEURL: "http://localhost:4000",
};
