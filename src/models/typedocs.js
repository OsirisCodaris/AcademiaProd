/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const typeDoc = sequelize.define(
    'typeDocs',
    {
      idtypedocs: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'typedocs',
      timestamps: false,
    }
  )
  typeDoc.associate = (models) => {
    // associations can be defined here
    typeDoc.hasMany(models.Documents, {
      foreignKey: 'idtypedocs',
    })
  }
  return typeDoc
}
