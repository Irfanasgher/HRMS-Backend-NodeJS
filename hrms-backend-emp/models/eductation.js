const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "eductation",
    {
      id_education: {
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
      degree_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "degree",
          key: "id_degree",
        },
      },
      institute_name_education: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      major_education: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      year_started_education: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      year_completed_education: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      grade_gpa_education: {
        type: DataTypes.STRING(20),
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
      tableName: "eductation",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_education" }],
        },
        {
          name: "fk_eductation_employee_info",
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
        {
          name: "fk_eductation_degree",
          using: "BTREE",
          fields: [{ name: "degree_id" }],
        },
      ],
    }
  );
};
