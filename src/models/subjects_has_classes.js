/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'subjectsHasClasses',
    {
      idsubjects: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'subjects',
          },
          key: 'idsubjects',
        },
      },
      idclasses: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'classes',
          },
          key: 'idclasses',
        },
      },
    },
    {
      sequelize,
      tableName: 'subjects_has_classes',
      timestamps: false,
    }
  )
}
