/* jshint indent: 2 */

module.exports = (sequelize) => {
  const docHasSubjectsHasClasses = sequelize.define(
    'docHasSubjectsHasClasses',
    {},
    {
      sequelize,
      tableName: 'documents_has_subjects_has_classes',
      timestamps: false,
    }
  )

  return docHasSubjectsHasClasses
}
