const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "work_experience",
    {
      id_work_experience: {
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
      company__work_experience: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      details__work_experience: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      year_started_work_experience: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      year_ended_work_experience: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      position__work_experience: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      salary__work_experience: {
        type: DataTypes.INTEGER,
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
      tableName: "work_experience",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_work_experience" }],
        },
        {
          name: "fk_work_experience_employee_info",
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
      ],
    }
  );
};
