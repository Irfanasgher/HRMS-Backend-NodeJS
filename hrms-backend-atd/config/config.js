// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "",

//   DB: "hrms-attendence",
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
  DB: "hrms-attendance-prod",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
