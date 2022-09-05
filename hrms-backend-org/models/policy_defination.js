const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('policy_defination', {
    policy_type: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'policy_type',
        key: 'id_policy_type'
      }
    },
    id_policy: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_policy: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description_policy: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    note_policy: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_enable_policy: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'policy_defination',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_policy" },
        ]
      },
      {
        name: "fk_policy_defination_policy_type",
        using: "BTREE",
        fields: [
          { name: "policy_type" },
        ]
      },
    ]
  });
};
