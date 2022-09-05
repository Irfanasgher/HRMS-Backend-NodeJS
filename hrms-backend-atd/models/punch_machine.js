const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('punch_machine', {
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "Location Id will be retrieved from organization api service"
    },
    id_punch_machine: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_punch_machine: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code_punch_machine: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    setting_punch_machine: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "machine setting in key value pairs"
    },
    is_enable_machine: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'punch_machine',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_punch_machine" },
        ]
      },
    ]
  });
};
