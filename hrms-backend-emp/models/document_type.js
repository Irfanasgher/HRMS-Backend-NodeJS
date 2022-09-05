const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('document_type', {
    id_document_type: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_document_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mime_document_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    is_enable_document_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'document_type',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_document_type" },
        ]
      },
    ]
  });
};
