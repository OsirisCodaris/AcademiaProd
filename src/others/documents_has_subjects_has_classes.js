/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'documents_has_subjects_has_classes',
    {
      iddocuments: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'documents',
          },
          key: 'iddocuments',
        },
      },
      idsubjects: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'subjects_has_classes',
          },
          key: 'idsubjects',
        },
      },
      idclasses: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'subjects_has_classes',
          },
          key: 'idclasses',
        },
      },
    },
    {
      sequelize,
      tableName: 'documents_has_subjects_has_classes',
      timestamps: false,
    }
  )
}
