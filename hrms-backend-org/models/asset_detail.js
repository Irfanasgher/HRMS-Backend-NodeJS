const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asset_detail', {
    id_asset: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    asset_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'asset_type',
        key: 'id_asset_type'
      }
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'company_defination',
        key: 'id_company'
      }
    },
    name_asset: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    serial_number_asset: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    detail_asset: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    value_asset: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: true
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'asset_detail',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_asset" },
        ]
      },
      {
        name: "fk_asset_detail_company_defination",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
      {
        name: "fk_asset_detail_asset_type",
        using: "BTREE",
        fields: [
          { name: "asset_type_id" },
        ]
      },
    ]
  });
};
