const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const Sequelize = require('sequelize')

const configSequelize = require('./config/config.json')
let config = null

switch (process.env.NODE_ENV) {
  case 'production':
    config = configSequelize.production
    break
  case 'test':
    config = configSequelize.test
    break
  default:
    config = configSequelize.development
    break
}

const indexRouter = require('./routes/index')
const playersRouter = require('./routes/players')

/**
 * config database
 */
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
)

function connect () {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
}

// init db
connect()

/**
 * Express app
 */
const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// error middleware
app.use(function (err, req, res, next) {
  res.status(500).send({
    ok: false,
    error: err.message
  })
})

app.use('/', indexRouter)
app.use('/players', playersRouter)

module.exports = app
