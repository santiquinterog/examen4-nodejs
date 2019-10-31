'use strict'

const tableName = 'players'

module.exports = (sequelize, DataTypes) => {
  const commentSchema = {
    tableName,
    attributes: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowFalse: false,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isLength: {
            max: 100,
            msg: 'nombre max length is 100'
          }
        }
      },
      ranking: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pais: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isLength: {
            max: 50,
            msg: 'nombre max length is 100'
          }
        }
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      peso: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      altura: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      researchAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'research_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    },
    options: {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  }
  const Player = sequelize.define(
    tableName,
    commentSchema.attributes,
    commentSchema.options
  )

  Player.associate = function (models) {
    // associations can be defined here
  }
  return Player
}
