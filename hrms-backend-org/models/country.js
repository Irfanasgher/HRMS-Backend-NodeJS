const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country', {
    id_country: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    letter_code_country: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    iso_code_country: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    is_enable_country: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'country',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_country" },
        ]
      },
    ]
  });
};
