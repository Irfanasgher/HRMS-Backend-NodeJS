const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('increments', {
    id_increment: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    increment_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'increment_type',
        key: 'id_increment_type'
      }
    },
    period_payment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'period_payment',
        key: 'id_period_payment'
      }
    },
    amount_increment: {
      type: DataTypes.FLOAT(18,4),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'increments',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_increment" },
        ]
      },
      {
        name: "fk_increments_increment_type",
        using: "BTREE",
        fields: [
          { name: "increment_type_id" },
        ]
      },
      {
        name: "fk_increments_period_payment",
        using: "BTREE",
        fields: [
          { name: "period_payment_id" },
        ]
      },
    ]
  });
};
