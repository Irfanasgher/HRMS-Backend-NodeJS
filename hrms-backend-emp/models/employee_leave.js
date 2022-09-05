const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_leave",
    {
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employee_info",
          key: "id_employee_info",
        },
      },
      id_employee_leave: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      leave_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      reason_employee_leave: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      start_date_employee_leave: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date_employee_leave: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      balance_employee_leave: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_approved_employee_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_notified_employee_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      comment_employee_leave: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_employee_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employee_leave",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_employee_leave" }],
        },
        {
          name: "fk_employee_leave_employee_info",
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
      ],
    }
  );
};
