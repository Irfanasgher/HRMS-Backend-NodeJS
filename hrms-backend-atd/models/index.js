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

db.attendance = require("./attendance")(sequelize, Sequelize);
db.break_bank = require("./break_bank")(sequelize, Sequelize);
db.leave_bank = require("./leave_bank")(sequelize, Sequelize);
db.machine_log = require("./machine_log")(sequelize, Sequelize);
db.over_time = require("./over_time")(sequelize, Sequelize);
db.public_holiday = require("./public_holiday")(sequelize, Sequelize);
db.punch_machine = require("./punch_machine")(sequelize, Sequelize);
db.regular_shift = require("./regular_shift")(sequelize, Sequelize);
db.seasonal_shift = require("./seasonal_shift")(sequelize, Sequelize);
db.time_slot = require("./time_slot")(sequelize, Sequelize);
db.break_type = require("./break_type")(sequelize, Sequelize);
db.leave_type = require("./leave_type")(sequelize, Sequelize);

db.break_bank.belongsTo(db.break_type, {
  as: "break_type",
  foreignKey: "break_type_id",
});
db.break_type.hasMany(db.break_bank, {
  as: "break_banks",
  foreignKey: "break_type_id",
});
db.leave_bank.belongsTo(db.leave_type, {
  as: "leave_type",
  foreignKey: "leave_type_id",
});
db.leave_type.hasMany(db.leave_bank, {
  as: "leave_banks",
  foreignKey: "leave_type_id",
});
db.attendance.belongsTo(db.leave_bank, {
  as: "leave_bank",
  foreignKey: "leave_bank_id",
});
db.leave_bank.hasMany(db.attendance, {
  as: "attendances",
  foreignKey: "leave_bank_id",
});
db.attendance.belongsTo(db.over_time, {
  as: "over_time",
  foreignKey: "over_time_id",
});
db.over_time.hasMany(db.attendance, {
  as: "attendances",
  foreignKey: "over_time_id",
});
db.machine_log.belongsTo(db.punch_machine, {
  as: "punch_machine",
  foreignKey: "punch_machine_id",
});
db.punch_machine.hasMany(db.machine_log, {
  as: "machine_logs",
  foreignKey: "punch_machine_id",
});
db.time_slot.belongsTo(db.regular_shift, {
  as: "regular_shift",
  foreignKey: "regular_shift_id",
});
db.regular_shift.hasMany(db.time_slot, {
  as: "time_slots",
  foreignKey: "regular_shift_id",
});
db.time_slot.belongsTo(db.seasonal_shift, {
  as: "seasonal_shift",
  foreignKey: "seasonal_shift_id",
});
db.seasonal_shift.hasMany(db.time_slot, {
  as: "time_slots",
  foreignKey: "seasonal_shift_id",
});
db.attendance.belongsTo(db.time_slot, {
  as: "time_slot",
  foreignKey: "time_slot_id",
});
db.time_slot.hasMany(db.attendance, {
  as: "attendances",
  foreignKey: "time_slot_id",
});
db.break_bank.belongsTo(db.time_slot, {
  as: "time_slot",
  foreignKey: "time_slot_id",
});
db.time_slot.hasMany(db.break_bank, {
  as: "break_banks",
  foreignKey: "time_slot_id",
});
module.exports = db;
