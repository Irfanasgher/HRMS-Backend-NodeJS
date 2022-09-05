const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('custom_value', {
    id_custom_value: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    custom_field_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'custom_field',
        key: 'id_custom_field'
      }
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'company_defination',
        key: 'id_company'
      }
    },
    entered_custom_value: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'custom_value',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_custom_value" },
        ]
      },
      {
        name: "fk_custom_value_custom_field",
        using: "BTREE",
        fields: [
          { name: "custom_field_id" },
        ]
      },
      {
        name: "fk_custom_value_company_defination_1",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
    ]
  });
};
