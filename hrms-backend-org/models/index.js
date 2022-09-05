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

//requiring models
db.custom_value = require("./custom_value")(sequelize, Sequelize);
db.custom_field = require("./custom_field")(sequelize, Sequelize);
db.field_option = require("./field_option")(sequelize, Sequelize);
db.city = require("./city")(sequelize, Sequelize);
db.company_defination = require("./company_defination")(sequelize, Sequelize);
db.country = require("./country")(sequelize, Sequelize);
db.department_defination = require("./department_defination")(
  sequelize,
  Sequelize
);
db.designation_defination = require("./designation_defination")(
  sequelize,
  Sequelize
);
db.designation_type = require("./designation_type")(sequelize, Sequelize);
db.district = require("./district")(sequelize, Sequelize);
db.division = require("./division")(sequelize, Sequelize);
db.factor = require("./factor")(sequelize, Sequelize);
db.location = require("./location")(sequelize, Sequelize);
db.mapping_department_locaiton = require("./mapping_department_locaiton")(
  sequelize,
  Sequelize
);
db.organization_defination = require("./organization_defination")(
  sequelize,
  Sequelize
);
// db.policy_defination = require("./policy_defination")(sequelize, Sequelize);
// db.policy_type = require("./policy_type")(sequelize, Sequelize);
db.state = require("./state")(sequelize, Sequelize);
db.tehsil = require("./tehsil")(sequelize, Sequelize);
// db.unit = require("./unit")(sequelize, Sequelize);
db.mapping_designation_company = require("./mapping_designation_company")(
  sequelize,
  Sequelize
);
db.custom_form = require("./custom_form")(sequelize, Sequelize);
db.mapping_company_policy = require("./mapping_company_policy")(
  sequelize,
  Sequelize
);
db.mapping_policy_group = require("./mapping_policy_group")(
  sequelize,
  Sequelize
);

db.policy_group = require("./policy_group")(sequelize, Sequelize);

db.policy_defination = require("./policy_defination")(sequelize, Sequelize);

db.policy_type = require("./policy_type")(sequelize, Sequelize);

db.factor = require("./factor")(sequelize, Sequelize);

db.policy_custom_field = require("./policy_custom_field")(sequelize, Sequelize);

db.policy_custom_value = require("./policy_custom_value")(sequelize, Sequelize);

db.policy_field_option = require("./policy_field_option")(sequelize, Sequelize);
db.asset_detail = require("./asset_detail")(sequelize, Sequelize);
db.asset_type = require("./asset_type")(sequelize, Sequelize);

//relations and associations

db.asset_detail.belongsTo(db.company_defination, {
  as: "company",
  foreignKey: "company_id",
});
db.company_defination.hasMany(db.asset_detail, {
  as: "asset_details",
  foreignKey: "company_id",
});
db.asset_detail.belongsTo(db.asset_type, {
  as: "asset_type",
  foreignKey: "asset_type_id",
});
db.asset_type.hasMany(db.asset_detail, {
  as: "asset_details",
  foreignKey: "asset_type_id",
});

db.mapping_company_policy.belongsTo(db.company_defination, {
  as: "company",
  foreignKey: "company_id",
});
db.company_defination.hasMany(db.mapping_company_policy, {
  as: "mapping_company_policies",
  foreignKey: "company_id",
});

db.mapping_company_policy.belongsTo(db.policy_defination, {
  as: "policy",
  foreignKey: "policy_id",
});
db.policy_defination.hasMany(db.mapping_company_policy, {
  as: "mapping_company_policies",
  foreignKey: "policy_id",
});

db.mapping_policy_group.belongsTo(db.policy_defination, {
  as: "policy",
  foreignKey: "policy_id",
});
db.policy_defination.hasMany(db.mapping_policy_group, {
  as: "mapping_policy_groups",
  foreignKey: "policy_id",
});

db.mapping_policy_group.belongsTo(db.policy_group, {
  as: "policy_group",
  foreignKey: "policy_group_id",
});
db.policy_group.hasMany(db.mapping_policy_group, {
  as: "mapping_policy_groups",
  foreignKey: "policy_group_id",
});

db.factor.belongsTo(db.policy_defination, {
  as: "policy",
  foreignKey: "policy_id",
});
db.policy_defination.hasMany(db.factor, {
  as: "factors",
  foreignKey: "policy_id",
});

db.policy_defination.belongsTo(db.policy_type, {
  as: "policy_type_policy_type",
  foreignKey: "policy_type",
});
db.policy_type.hasMany(db.policy_defination, {
  as: "policy_definations",
  foreignKey: "policy_type",
});

db.policy_custom_value.belongsTo(db.policy_custom_field, {
  as: "policy_custom_field",
  foreignKey: "policy_custom_field_id",
});
db.policy_custom_field.hasMany(db.policy_custom_value, {
  as: "policy_custom_values",
  foreignKey: "policy_custom_field_id",
});
db.policy_field_option.belongsTo(db.policy_custom_field, {
  as: "policy_custom_field",
  foreignKey: "policy_custom_field_id",
});
db.policy_custom_field.hasMany(db.policy_field_option, {
  as: "policy_field_options",
  foreignKey: "policy_custom_field_id",
});

db.policy_custom_field.belongsTo(db.policy_defination, {
  as: "policy",
  foreignKey: "policy_id",
});
db.policy_defination.hasMany(db.policy_custom_field, {
  as: "policy_custom_fields",
  foreignKey: "policy_id",
});

//------------------------

db.location.belongsTo(db.city, { as: "city", foreignKey: "city_id" });
db.city.hasMany(db.location, { as: "locations", foreignKey: "city_id" });
// db.department_defination.belongsTo(db.company_defination, {
//   as: "company",
//   foreignKey: "company_id",
// });
// db.company_defination.hasMany(db.department_defination, {
//   as: "department_definations",
//   foreignKey: "company_id",
// });
// db.designation_defination.belongsTo(db.company_defination, {
//   as: "company",
//   foreignKey: "company_id",
// });
// db.company_defination.hasMany(db.designation_defination, {
//   as: "designation_definations",
//   foreignKey: "company_id",
// });
// db.policy_defination.belongsTo(db.company_defination, {
//   as: "company",
//   foreignKey: "company_id",
// });
// db.company_defination.hasMany(db.policy_defination, {
//   as: "policy_definations",
//   foreignKey: "company_id",
// });
// db.unit.belongsTo(db.company_defination, {
//   as: "company",
//   foreignKey: "company_id",
// });
// db.company_defination.hasMany(db.unit, {
//   as: "units",
//   foreignKey: "company_id",
// });
db.custom_form.belongsTo(db.company_defination, {
  as: "company",
  foreignKey: "company_id",
});
db.company_defination.hasMany(db.custom_form, {
  as: "custom_form",
  foreignKey: "company_id",
});

db.mapping_designation_company.belongsTo(db.company_defination, {
  as: "company",
  foreignKey: "company_id",
});
db.company_defination.hasMany(db.mapping_designation_company, {
  as: "mapping_designation_company",
  foreignKey: "company_id",
});

db.mapping_designation_company.belongsTo(db.designation_defination, {
  as: "designation_defination",
  foreignKey: "designation_id",
});
db.designation_defination.hasMany(db.mapping_designation_company, {
  as: "mapping_designation_company",
  foreignKey: "designation_id",
});

db.custom_field.belongsTo(db.custom_form, {
  as: "custom_form",
  foreignKey: "custom_form_id",
});
db.custom_form.hasMany(db.custom_field, {
  as: "custom_field",
  foreignKey: "custom_form_id",
});
db.state.belongsTo(db.country, { as: "country", foreignKey: "country_id" });
db.country.hasMany(db.state, { as: "states", foreignKey: "country_id" });
db.department_defination.belongsTo(db.department_defination, {
  as: "parent_deparment",
  foreignKey: "parent_deparment_id",
});
db.department_defination.hasMany(db.department_defination, {
  as: "department_definations",
  foreignKey: "parent_deparment_id",
});
db.mapping_department_locaiton.belongsTo(db.department_defination, {
  as: "department",
  foreignKey: "department_id",
});
db.department_defination.hasMany(db.mapping_department_locaiton, {
  as: "mapping_department_locaitons",
  foreignKey: "department_id",
});
db.designation_defination.belongsTo(db.designation_defination, {
  as: "parent_designation",
  foreignKey: "parent_designation_id",
});
db.designation_defination.hasMany(db.designation_defination, {
  as: "designation_definations",
  foreignKey: "parent_designation_id",
});
db.designation_defination.belongsTo(db.designation_type, {
  as: "designation_type",
  foreignKey: "designation_type_id",
});
db.designation_type.hasMany(db.designation_defination, {
  as: "designation_definations",
  foreignKey: "designation_type_id",
});
db.tehsil.belongsTo(db.district, { as: "district", foreignKey: "district_id" });
db.district.hasMany(db.tehsil, { as: "tehsils", foreignKey: "district_id" });
db.district.belongsTo(db.division, {
  as: "division",
  foreignKey: "division_id",
});
db.division.hasMany(db.district, {
  as: "districts",
  foreignKey: "division_id",
});
db.mapping_department_locaiton.belongsTo(db.location, {
  as: "location",
  foreignKey: "location_id",
});
db.location.hasMany(db.mapping_department_locaiton, {
  as: "mapping_department_locaitons",
  foreignKey: "location_id",
});
// db.unit.belongsTo(db.location, {
//   as: "id_unit_location",
//   foreignKey: "id_unit",
// });
// db.location.hasOne(db.unit, { as: "id_unit_unit", foreignKey: "id_unit" });
db.company_defination.belongsTo(db.organization_defination, {
  as: "organization",
  foreignKey: "organization_id",
});
db.organization_defination.hasMany(db.company_defination, {
  as: "company_definations",
  foreignKey: "organization_id",
});
// db.factor.belongsTo(db.policy_defination, {
//   as: "policy",
//   foreignKey: "policy_id",
// });
// db.policy_defination.hasMany(db.factor, {
//   as: "factors",
//   foreignKey: "policy_id",
// });
// db.factor.belongsTo(db.policy_type, {
//   as: "policy_type",
//   foreignKey: "policy_type_id",
// });
// db.policy_type.hasMany(db.factor, {
//   as: "factors",
//   foreignKey: "policy_type_id",
// });
db.city.belongsTo(db.state, { as: "state", foreignKey: "state_id" });
db.state.hasMany(db.city, { as: "cities", foreignKey: "state_id" });
db.division.belongsTo(db.state, { as: "state", foreignKey: "state_id" });
db.state.hasMany(db.division, { as: "divisions", foreignKey: "state_id" });
db.location.belongsTo(db.tehsil, { as: "tehsil", foreignKey: "tehsil_id" });
db.tehsil.hasMany(db.location, { as: "locations", foreignKey: "tehsil_id" });
db.location.belongsTo(db.company_defination, {
  as: "company_defination",
  foreignKey: "company_id",
});
db.company_defination.hasMany(db.location, {
  as: "locations",
  foreignKey: "company_id",
});
db.location.belongsTo(db.organization_defination, {
  as: "organzition_defination",
  foreignKey: "organization_id",
});
db.organization_defination.hasMany(db.location, {
  as: "locations",
  foreignKey: "organization_id",
});

db.custom_value.belongsTo(db.company_defination, {
  as: "company",
  foreignKey: "company_id",
});
db.company_defination.hasMany(db.custom_value, {
  as: "custom_values",
  foreignKey: "company_id",
});
db.custom_value.belongsTo(db.custom_field, {
  as: "custom_field",
  foreignKey: "custom_field_id",
});
db.custom_field.hasMany(db.custom_value, {
  as: "custom_values",
  foreignKey: "custom_field_id",
});
db.field_option.belongsTo(db.custom_field, {
  as: "custom_field",
  foreignKey: "custom_field_id",
});
db.custom_field.hasMany(db.field_option, {
  as: "field_options",
  foreignKey: "custom_field_id",
});

module.exports = db;
