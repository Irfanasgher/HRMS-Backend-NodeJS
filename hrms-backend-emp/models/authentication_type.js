const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authentication_type', {
    id_authentication_type: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_authentication_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    setting_authentication_type: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    is_sysadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'authentication_type',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_authentication_type" },
        ]
      },
    ]
  });
};
