const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_address",
    {
      id_employee_address: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      address_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "address_type",
          key: "id_address_type",
        },
      },
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employee_info",
          key: "id_employee_info",
        },
      },
      full_name_employee_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      mobile_no_employee_address: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      landline_employee_address: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      line_one_employee_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      line_two_employee_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      city_employee_address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      province_employee_address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      postal_code_employee_address: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      country_employee_address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employee_address",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_employee_address" }],
        },
        {
          name: "fk_employee_address_address_type",
          using: "BTREE",
          fields: [{ name: "address_type_id" }],
        },
        {
          name: "fk_employee_address_employee_info",
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
      ],
    }
  );
};
