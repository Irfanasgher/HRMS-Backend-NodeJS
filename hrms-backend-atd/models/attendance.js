const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "attendance",
    {
      leave_bank_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "leave_bank",
          key: "id_leave_bank",
        },
      },
      over_time_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "over_time",
          key: "id_over_time",
        },
      },
      employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "employee id will be retrieved from employee api service",
      },
      time_slot_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "time_slot",
          key: "id_time_slot",
        },
      },
      id_attendance: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      date_attendance: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      is_absent_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_leave_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_public_holiday_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      work_hour_attendance: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      is_over_time_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      over_work_hour_attendance: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      is_leave_approved_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      leave_balance_attendance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_enable_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      time_difference: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment_time_difference: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "attendance",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_attendance" }],
        },
        {
          name: "fk_attendance_time_slot",
          using: "BTREE",
          fields: [{ name: "time_slot_id" }],
        },
        {
          name: "fk_attendance_over_time",
          using: "BTREE",
          fields: [{ name: "over_time_id" }],
        },
        {
          name: "fk_attendance_leave_bank_1",
          using: "BTREE",
          fields: [{ name: "leave_bank_id" }],
        },
      ],
    }
  );
};
