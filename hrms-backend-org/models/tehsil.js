const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tehsil', {
    district_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'district',
        key: 'id_district'
      }
    },
    id_tehsil: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_tehsil: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_enable_tehsil: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tehsil',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tehsil" },
        ]
      },
      {
        name: "fk_tehsil_district",
        using: "BTREE",
        fields: [
          { name: "district_id" },
        ]
      },
    ]
  });
};
