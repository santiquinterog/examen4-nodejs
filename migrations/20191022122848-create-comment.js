'use strict'

const Sequelize = require('sequelize')

const tableName = 'players'

const attributes = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowFalse: false,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isLength: {
        max: 100,
        msg: 'nombre max length is 100'
      }
    }
  },
  ranking: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pais: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isLength: {
        max: 50,
        msg: 'nombre max length is 100'
      }
    }
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  peso: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  altura: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'created_at'
  },
  researchAt: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'research_at'
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'updated_at'
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE,
    field: 'deleted_at'
  }
}

const options = {
  timestamps: true,
  paranoid: true,
  underscored: true
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, attributes, options)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName)
  }
}
