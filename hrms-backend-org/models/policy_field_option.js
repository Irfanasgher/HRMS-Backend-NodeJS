const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('policy_field_option', {
    id_policy_field_option: {
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
    name_policy_field_option: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'policy_field_option',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_policy_field_option" },
        ]
      },
      {
        name: "fk_policy_field_option_policy_custom_field",
        using: "BTREE",
        fields: [
          { name: "policy_custom_field_id" },
        ]
      },
    ]
  });
};
