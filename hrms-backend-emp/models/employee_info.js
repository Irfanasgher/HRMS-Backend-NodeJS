const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_info",
    {
      id_employee_info: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      employee_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "employee_type",
          key: "id_employee_type",
        },
      },
      code_employee_info: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      first_name_employee_info: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      middle_name_employee_info: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      last_name_employee_info: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      personal_email_employee_info: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      official_email_employee_info: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      personal_mobile_employee_info: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      official_mobile_employee_info: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      father_fullname_employee_info: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      dob_employee_info: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender_employee_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cnic_number_employee_info: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      blood_group_emloyee_info: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      joining_date_employee_info: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      termination_date_employee_info: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      note_admin_employee_info: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      reason_note_employee_info: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      comment_note_employee_info: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_employee_info: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employee_info",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_employee_info" }],
        },
        {
          name: "fk_employee_info_employee_type",
          using: "BTREE",
          fields: [{ name: "employee_type_id" }],
        },
      ],
    }
  );
};
