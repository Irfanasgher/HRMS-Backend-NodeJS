const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_allocation",
    {
      employee_info_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employee_info",
          key: "id_employee_info",
        },
      },
      allocation_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "allocation_type",
          key: "id_allocation",
        },
      },
      id_employee_allocation: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      value_employee_allocation: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employee_allocation",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_employee_allocation" }],
        },
        {
          name: "fk_employee_allocation_employee_info",
          using: "BTREE",
          fields: [{ name: "employee_info_id" }],
        },
        {
          name: "fk_employee_allocation_allocation_type",
          using: "BTREE",
          fields: [{ name: "allocation_type_id" }],
        },
      ],
    }
  );
};
