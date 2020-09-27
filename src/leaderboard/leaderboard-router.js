const express = require('express')
const path = require('path')
const LeaderboardService = require('./leaderboard-service')
const { requireAuth } = require('../middleware/jwt-auth')

const leaderboardRouter = express.Router()
const jsonBodyParser = express.json()

leaderboardRouter
  .route('/')
  .get((req, res, next) => {
    LeaderboardService.getTopTen(
      req.app.get('db'),
    )
      .then(scores => {
        res.json(scores)
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { score } = req.body
    const newScore = {
      score: score
    }

    for (const [key, value] of Object.entries(newScore))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newScore.user_id = req.user.id

    console.log(newScore)
    
    LeaderboardService.postScore(
      req.app.get('db'),
      newScore
    )
      .then(score => {
        res
          .status(201)
          .json(score)
      })
      .catch(next)
    })

module.exports = leaderboardRouter