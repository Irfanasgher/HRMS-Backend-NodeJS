const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deductions', {
    id_deduction: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    period_payment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'period_payment',
        key: 'id_period_payment'
      }
    },
    deduction_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'deduction_type',
        key: 'id_deduction_type'
      }
    },
    amount_deduction: {
      type: DataTypes.FLOAT(18,4),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'deductions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_deduction" },
        ]
      },
      {
        name: "fk_deductions_deduction_type",
        using: "BTREE",
        fields: [
          { name: "deduction_type_id" },
        ]
      },
      {
        name: "fk_deductions_period_payment",
        using: "BTREE",
        fields: [
          { name: "period_payment_id" },
        ]
      },
    ]
  });
};
