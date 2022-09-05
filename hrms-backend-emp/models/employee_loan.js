const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_loan', {
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employee_info',
        key: 'id_employee_info'
      }
    },
    id_employee_loan: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    is_advance_employee_loan: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_approved_employee_loan: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    approval_date_employee_load: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gross_salary_employee_loan: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: false
    },
    amount_employee_loan: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: false
    },
    installment_amount_employee_loan: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: false
    },
    total_installment_employee_loan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paid_installment_employee_loan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paid_amount_employee_loan: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: false
    },
    is_paid_employee_loan: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_enable_employee_loan: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_loan',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_employee_loan" },
        ]
      },
      {
        name: "fk_employee_loan_employee_info",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
