/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'notions_has_subjects_has_classes',
    {
      notions_idnotions: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'notions',
          },
          key: 'idnotions',
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
      tableName: 'notions_has_subjects_has_classes',
      timestamps: false,
    }
  )
}
