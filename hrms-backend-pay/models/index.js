//--------------------------------------------------------------------------
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
db.deduction_type = require("./deduction_type")(sequelize, Sequelize);
db.deductions = require("./deductions")(sequelize, Sequelize);
db.increment_type = require("./increment_type")(sequelize, Sequelize);
db.increments = require("./increments")(sequelize, Sequelize);
db.payment_method_type = require("./payment_method_type")(sequelize, Sequelize);
db.payment_methods = require("./payment_methods")(sequelize, Sequelize);
db.payment_type = require("./payment_type")(sequelize, Sequelize);
db.period_payment = require("./period_payment")(sequelize, Sequelize);

db.deductions.belongsTo(db.deduction_type, {
  as: "deduction_type",
  foreignKey: "deduction_type_id",
});
db.deduction_type.hasMany(db.deductions, {
  as: "deductions",
  foreignKey: "deduction_type_id",
});
db.increments.belongsTo(db.increment_type, {
  as: "increment_type",
  foreignKey: "increment_type_id",
});
db.increment_type.hasMany(db.increments, {
  as: "increments",
  foreignKey: "increment_type_id",
});
db.payment_methods.belongsTo(db.payment_method_type, {
  as: "payment_method_type",
  foreignKey: "payment_method_type_id",
});
db.payment_method_type.hasMany(db.payment_methods, {
  as: "payment_methods",
  foreignKey: "payment_method_type_id",
});
db.period_payment.belongsTo(db.payment_method_type, {
  as: "payment_method_type",
  foreignKey: "payment_method_type_id",
});
db.payment_method_type.hasMany(db.period_payment, {
  as: "period_payments",
  foreignKey: "payment_method_type_id",
});
db.period_payment.belongsTo(db.payment_type, {
  as: "payment_type",
  foreignKey: "payment_type_id",
});
db.payment_type.hasMany(db.period_payment, {
  as: "period_payments",
  foreignKey: "payment_type_id",
});
db.deductions.belongsTo(db.period_payment, {
  as: "period_payment",
  foreignKey: "period_payment_id",
});
db.period_payment.hasMany(db.deductions, {
  as: "deductions",
  foreignKey: "period_payment_id",
});
db.increments.belongsTo(db.period_payment, {
  as: "period_payment",
  foreignKey: "period_payment_id",
});
db.period_payment.hasMany(db.increments, {
  as: "increments",
  foreignKey: "period_payment_id",
});
module.exports = db;
