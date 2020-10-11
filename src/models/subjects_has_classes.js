/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const subjectsHasClasses = sequelize.define(
    'subjectsHasClasses',
    {
      idsubjectshasclasses: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      tableName: 'subjects_has_classes',
      timestamps: false,
    }
  )
  subjectsHasClasses.associate = (models) => {
    subjectsHasClasses.belongsToMany(models.Documents, {
      through: 'docHasSubjectsHasClasses',
      as: 'docInSubjectClasses',
      foreignKey: 'idsubjectshasclasses',
      otherKey: 'iddocuments',
    })
  }

  return subjectsHasClasses
}
