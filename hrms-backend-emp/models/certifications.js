const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('certifications', {
    id_certification: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    institute_certification: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name_certification: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    duration_certification: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    official_code_certification: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description_certification: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'certifications',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_certification" },
        ]
      },
    ]
  });
};
