const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('policy_custom_value', {
    id_policy_custom_value: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    policy_custom_field_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'policy_custom_field',
        key: 'id_policy_custom_field'
      }
    },
    entity_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    entity_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    entered_policy_custom_value: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'policy_custom_value',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_policy_custom_value" },
        ]
      },
      {
        name: "fk_policy_custom_value_policy_custom_field",
        using: "BTREE",
        fields: [
          { name: "policy_custom_field_id" },
        ]
      },
    ]
  });
};
