//---------------------------------
const dbConfig = require("../config/config");
const Sequelize = require("sequelize");

//db configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.permission_role = require("./permission_role")(sequelize, Sequelize);
db.role = require("./role")(sequelize, Sequelize);
db.user_role = require("./user_role")(sequelize, Sequelize);
// relations
db.permission_role.belongsTo(db.role, { as: "role", foreignKey: "role_id" });
db.role.hasMany(db.permission_role, {
  as: "permission_roles",
  foreignKey: "role_id",
});
db.user_role.belongsTo(db.role, { as: "role", foreignKey: "role_id" });
db.role.hasMany(db.user_role, { as: "user_roles", foreignKey: "role_id" });
//---------------------------------

module.exports = db;
