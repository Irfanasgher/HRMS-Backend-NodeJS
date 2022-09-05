const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('district', {
    division_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'division',
        key: 'id_division'
      }
    },
    id_district: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_district: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_enable_district: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'district',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_district" },
        ]
      },
      {
        name: "fk_district_division",
        using: "BTREE",
        fields: [
          { name: "division_id" },
        ]
      },
    ]
  });
};
