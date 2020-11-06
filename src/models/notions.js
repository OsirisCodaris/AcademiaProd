/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Notion = sequelize.define(
    'Notions',
    {
      idnotions: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      notions: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      iddocuments: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: {
            tableName: 'documents',
          },
          key: 'iddocuments',
        },
      },
    },
    {
      sequelize,
      tableName: 'notions',
      timestamps: false,
    }
  )
  Notion.associate = (models) => {
    // associations can be defined here
    Notion.belongsTo(models.Documents, {
      foreignKey: 'iddocuments',
    })
  }
  return Notion
}
