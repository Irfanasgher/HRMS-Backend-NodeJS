const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_benefit', {
    benefit_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "will be retreived from salary and benfit api service"
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'employee_info',
        key: 'id_employee_info'
      }
    },
    id_employee_benefit: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    is_percent_employee_benefit: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    value_employee_benefit: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: false
    },
    is_enable_employee_benefit: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_benefit',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_employee_benefit" },
        ]
      },
      {
        name: "fk_employee_benefit_employee_info_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
