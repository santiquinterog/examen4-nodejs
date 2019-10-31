const express = require('express')
const router = express.Router()
const { players: Player } = require('../models')
const jwt = require('express-jwt')
const { secret } = require('../config')

/* GET players listing. */
router.get('/', jwt({ secret }), async function (req, res, next) {
  let players = null
  const { user } = req

  if (user) {
    try {
      players = await Player.findAll()
    } catch (err) {
      res.statusCode = 500
      res.json({
        ok: false,
        message: err.message
      })
      return
    }

    res.json({
      ok: true,
      players,
      message: 'players success'
    })
  } else {
    return next(new Error('Unauthorize'))
  }
})

/* POST create a player */
router.post('/', async function (req, res, next) {
  let player = null
  try {
    player = await Player.create(req.body)
  } catch (err) {
    res.json({
      ok: false,
      message: err.message
    })
    return
  }

  res.json({
    ok: true,
    player,
    message: 'player was created'
  })
})

/* Find player */
router.find('/:id', jwt({ secret }), async function (req, res, next) {
  let players = null
  const { user } = req

  if (user) {
    try {
      players = await Player.find(req.body.id)
    } catch (err) {
      res.statusCode = 500
      res.json({
        ok: false,
        message: err.message
      })
      return
    }

    res.json({
      ok: true,
      players,
      message: 'player success'
    })
  } else {
    return next(new Error('Unauthorize'))
  }
})

/* Drop player */
router.drop('/:id', jwt({ secret }), async function (req, res, next) {
  let players = null
  const { user } = req

  if (user) {
    try {
      players = await Player.drop(req.body.id)
    } catch (err) {
      res.statusCode = 500
      res.json({
        ok: false,
        message: err.message
      })
      return
    }

    res.json({
      ok: true,
      players,
      message: 'player deleted'
    })
  } else {
    return next(new Error('Unauthorize'))
  }
})

/* Update player */
router.put('/:id', jwt({ secret }), async function (req, res, next) {
  let players = null
  /* están quemados los datos para facilitar la prueba */
  const name = 'Santiago'
  const ranking = 1
  const pais = 'Colombia'
  const edad = 20
  const peso = 70
  const altura = 1.75
  const { user } = req

  if (user) {
    try {
      players = await Player.find(req.body.id)
      Player.req.body.name = name
      Player.req.body.edad = edad
      Player.req.body.ranking = ranking
      Player.req.body.peso = peso
      Player.req.body.altura = altura
      Player.req.body.pais = pais
    } catch (err) {
      res.statusCode = 500
      res.json({
        ok: false,
        message: err.message
      })
      return
    }

    res.json({
      ok: true,
      players,
      message: 'player success'
    })
  } else {
    return next(new Error('Unauthorize'))
  }
})

module.exports = router
