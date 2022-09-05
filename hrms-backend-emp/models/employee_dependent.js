const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_dependent",
    {
      id_employee_dependent: {
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
      dependent_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "dependent_type",
          key: "id_dependent_type",
        },
      },
      fullname_employee_dependent: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      mobile_employee_dependent: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email_employee_dependent: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      dob_employee_dependent: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender_employee_dependent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cnic_employee_dependent: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      is_primary_contact: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      date_enroll_employee_dependent: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_same_address_employee_dependent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_same_permenant_address_employee_dependent: {
        type: DataTypes.BOOLEAN,
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
      tableName: "employee_dependent",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_employee_dependent" }],
        },
        {
          name: "fk_employee_dependent_employee_info",
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
        {
          name: "fk_employee_dependent_dependent_type",
          using: "BTREE",
          fields: [{ name: "dependent_type_id" }],
        },
      ],
    }
  );
};
