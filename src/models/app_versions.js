/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const AppVersion = sequelize.define(
    'appVersions',
    {
      idappversions: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minAppVersion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'appversions',
      timestamps: true,
    }
  )
  /* AppVersion.associate = (models) => {
    // associations can be defined here
    AppVersion.belongsTo(models.Problems, {
      foreignKey: 'idproblems',
    })
    AppVersion.belongsTo(models.Users, {
      foreignKey: 'idusers',
    }) 
  } */
  return AppVersion
}
