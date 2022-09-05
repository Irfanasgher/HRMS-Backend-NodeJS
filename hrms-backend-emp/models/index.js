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

db.address_type = require("./address_type")(sequelize, Sequelize);
db.allocation_type = require("./allocation_type")(sequelize, Sequelize);
db.authentication_type = require("./authentication_type")(sequelize, Sequelize);
db.certifications = require("./certifications")(sequelize, Sequelize);
db.degree = require("./degree")(sequelize, Sequelize);
db.dependent_type = require("./dependent_type")(sequelize, Sequelize);
db.document_type = require("./document_type")(sequelize, Sequelize);
db.education_degree = require("./education_degree")(sequelize, Sequelize);
db.eductation = require("./eductation")(sequelize, Sequelize);
db.employee_address = require("./employee_address")(sequelize, Sequelize);
db.employee_allocation = require("./employee_allocation")(sequelize, Sequelize);
db.employee_authentication = require("./employee_authentication")(
  sequelize,
  Sequelize
);
db.employee_benefit = require("./employee_benefit")(sequelize, Sequelize);
db.employee_certificaiton = require("./employee_certificaiton")(
  sequelize,
  Sequelize
);
db.employee_dependent = require("./employee_dependent")(sequelize, Sequelize);
db.employee_document = require("./employee_document")(sequelize, Sequelize);
db.employee_info = require("./employee_info")(sequelize, Sequelize);
db.employee_leave = require("./employee_leave")(sequelize, Sequelize);
db.employee_loan = require("./employee_loan")(sequelize, Sequelize);
db.employee_referrence = require("./employee_referrence")(sequelize, Sequelize);
db.employee_type = require("./employee_type")(sequelize, Sequelize);
db.reason = require("./reason")(sequelize, Sequelize);
db.reason_type = require("./reason_type")(sequelize, Sequelize);
db.referrence_type = require("./referrence_type")(sequelize, Sequelize);
db.work_experience = require("./work_experience")(sequelize, Sequelize);

db.employee_address.belongsTo(db.address_type, {
  as: "address_type",
  foreignKey: "address_type_id",
});
db.address_type.hasMany(db.employee_address, {
  as: "employee_addresses",
  foreignKey: "address_type_id",
});
db.employee_allocation.belongsTo(db.allocation_type, {
  as: "allocation_type",
  foreignKey: "allocation_type_id",
});
db.allocation_type.hasMany(db.employee_allocation, {
  as: "employee_allocations",
  foreignKey: "allocation_type_id",
});
db.employee_authentication.belongsTo(db.authentication_type, {
  as: "authentication_type",
  foreignKey: "authentication_type_id",
});
db.authentication_type.hasMany(db.employee_authentication, {
  as: "employee_authentications",
  foreignKey: "authentication_type_id",
});
db.employee_certificaiton.belongsTo(db.certifications, {
  as: "certificaiton",
  foreignKey: "certificaiton_id",
});
db.certifications.hasMany(db.employee_certificaiton, {
  as: "employee_certificaitons",
  foreignKey: "certificaiton_id",
});
db.eductation.belongsTo(db.degree, { as: "degree", foreignKey: "degree_id" });
db.degree.hasMany(db.eductation, {
  as: "eductations",
  foreignKey: "degree_id",
});
db.employee_dependent.belongsTo(db.dependent_type, {
  as: "dependent_type",
  foreignKey: "dependent_type_id",
});
db.dependent_type.hasMany(db.employee_dependent, {
  as: "employee_dependents",
  foreignKey: "dependent_type_id",
});
db.employee_document.belongsTo(db.document_type, {
  as: "document_type",
  foreignKey: "document_type_id",
});
db.document_type.hasMany(db.employee_document, {
  as: "employee_documents",
  foreignKey: "document_type_id",
});
db.eductation.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.eductation, {
  as: "eductations",
  foreignKey: "employee_id",
});
db.employee_address.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_address, {
  as: "employee_addresses",
  foreignKey: "employee_id",
});
db.employee_allocation.belongsTo(db.employee_info, {
  as: "employee_info",
  foreignKey: "employee_info_id",
});
db.employee_info.hasMany(db.employee_allocation, {
  as: "employee_allocations",
  foreignKey: "employee_info_id",
});
db.employee_authentication.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_authentication, {
  as: "employee_authentications",
  foreignKey: "employee_id",
});
db.employee_benefit.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_benefit, {
  as: "employee_benefits",
  foreignKey: "employee_id",
});
db.employee_certificaiton.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_certificaiton, {
  as: "employee_certificaitons",
  foreignKey: "employee_id",
});
db.employee_dependent.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_dependent, {
  as: "employee_dependents",
  foreignKey: "employee_id",
});
db.employee_document.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_document, {
  as: "employee_documents",
  foreignKey: "employee_id",
});
db.employee_leave.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_leave, {
  as: "employee_leaves",
  foreignKey: "employee_id",
});
db.employee_loan.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_loan, {
  as: "employee_loans",
  foreignKey: "employee_id",
});
db.employee_referrence.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.employee_referrence, {
  as: "employee_referrences",
  foreignKey: "employee_id",
});
db.work_experience.belongsTo(db.employee_info, {
  as: "employee",
  foreignKey: "employee_id",
});
db.employee_info.hasMany(db.work_experience, {
  as: "work_experiences",
  foreignKey: "employee_id",
});
db.employee_info.belongsTo(db.employee_type, {
  as: "employee_type",
  foreignKey: "employee_type_id",
});
db.employee_type.hasMany(db.employee_info, {
  as: "employee_infos",
  foreignKey: "employee_type_id",
});
db.reason.belongsTo(db.reason_type, {
  as: "reason_type",
  foreignKey: "reason_type_id",
});
db.reason_type.hasMany(db.reason, {
  as: "reasons",
  foreignKey: "reason_type_id",
});
db.employee_referrence.belongsTo(db.referrence_type, {
  as: "referrence_type",
  foreignKey: "referrence_type_id",
});
db.referrence_type.hasMany(db.employee_referrence, {
  as: "employee_referrences",
  foreignKey: "referrence_type_id",
});
module.exports = db;
