const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "mapping_department_locaiton",
    {
      department_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "department_defination",
          key: "id_department",
        },
      },
      location_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "location",
          key: "id_location",
        },
      },
      id_mapping_department_location: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      note_mapping_department_location: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_mapping_department_location: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "mapping_department_locaiton",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_mapping_department_location" }],
        },
        {
          name: "fk_mapping_department_locaiton_department_defination",
          using: "BTREE",
          fields: [{ name: "department_id" }],
        },
        {
          name: "fk_mapping_department_locaiton_location",
          using: "BTREE",
          fields: [{ name: "location_id" }],
        },
      ],
    }
  );
};
