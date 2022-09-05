const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('designation_type', {
    id_designation_type: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_designation_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    note_designation_type: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    is_enable_designation_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'designation_type',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_designation_type" },
        ]
      },
    ]
  });
};
