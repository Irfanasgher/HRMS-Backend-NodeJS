const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('policy_type', {
    id_policy_type: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_policy_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code_policy_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    is_enable_policy_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'policy_type',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_policy_type" },
        ]
      },
    ]
  });
};
