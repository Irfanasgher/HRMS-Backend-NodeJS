const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('policy_custom_field', {
    id_policy_custom_field: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    policy_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'policy_defination',
        key: 'id_policy'
      }
    },
    name_policy_custom_field: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type_policy_custom_field: {
      type: DataTypes.ENUM('text','radio','checkbox','dropdown'),
      allowNull: false,
      defaultValue: "text"
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'policy_custom_field',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_policy_custom_field" },
        ]
      },
      {
        name: "fk_policy_custom_field_policy_defination",
        using: "BTREE",
        fields: [
          { name: "policy_id" },
        ]
      },
    ]
  });
};
