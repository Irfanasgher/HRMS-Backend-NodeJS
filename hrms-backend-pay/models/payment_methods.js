const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_methods', {
    id_payment_method: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    payment_method_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'payment_method_type',
        key: 'id_payment_method_type'
      }
    },
    employee_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name_payment_method: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    value_payment_method: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment_methods',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_payment_method" },
        ]
      },
      {
        name: "fk_payment_methods_payment_method_type_1",
        using: "BTREE",
        fields: [
          { name: "payment_method_type_id" },
        ]
      },
    ]
  });
};
