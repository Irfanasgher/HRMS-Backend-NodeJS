const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('field_option', {
    id_field_option: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    custom_field_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'custom_field',
        key: 'id_custom_field'
      }
    },
    name_field_option: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'field_option',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_field_option" },
        ]
      },
      {
        name: "fk_field_option_custom_field",
        using: "BTREE",
        fields: [
          { name: "custom_field_id" },
        ]
      },
    ]
  });
};
