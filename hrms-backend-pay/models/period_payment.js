const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('period_payment', {
    payment_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'payment_type',
        key: 'id_payment_type'
      }
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    payment_method_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'payment_method_type',
        key: 'id_payment_method_type'
      }
    },
    id_period_payment: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title_period_payment: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    start_date_period_payment: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date_period_payment: {
      type: DataTypes.DATE,
      allowNull: false
    },
    salary_amount_period_payment: {
      type: DataTypes.FLOAT(18,4),
      allowNull: false
    },
    paid_amount_period_payment: {
      type: DataTypes.FLOAT(18,4),
      allowNull: false
    },
    message_period_payment: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    note_period_payment: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'period_payment',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_period_payment" },
        ]
      },
      {
        name: "fk_period_payment_payment_type",
        using: "BTREE",
        fields: [
          { name: "payment_type_id" },
        ]
      },
      {
        name: "fk_period_payment_payment_method_type",
        using: "BTREE",
        fields: [
          { name: "payment_method_type_id" },
        ]
      },
    ]
  });
};
