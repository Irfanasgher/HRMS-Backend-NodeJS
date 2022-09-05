const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_referrence",
    {
      id_employee_referrence: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employee_info",
          key: "id_employee_info",
        },
      },
      referrence_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "referrence_type",
          key: "id_referrence_type",
        },
      },
      fullname_employee_referrence: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      mobile_employee_referrence: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      landline_employee_referrence: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email_employee_referrence: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      organization_employee_referrence: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      designation_employee_referrence: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employee_referrence",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_employee_referrence" }],
        },
        {
          name: "fk_employee_referrence_employee_info",
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
        {
          name: "fk_employee_referrence_referrence_type",
          using: "BTREE",
          fields: [{ name: "referrence_type_id" }],
        },
      ],
    }
  );
};
