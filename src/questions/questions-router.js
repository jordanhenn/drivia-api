const express = require('express')
const Tesseract = require('tesseract.js')
const QuestionsService = require('./questions-service')
const jsonBodyParser = express.json()

const QuestionsRouter = express.Router()

QuestionsRouter
  .route('/')
  .get((req, res, next) => {
    const { category } = req.query
    QuestionsService.getQuestionsByCategory(req.app.get('db'), category)
      .then(questions => {
        res.json(questions)
      })
      .catch(next)
  })
  .post(jsonBodyParser, (req, res, next) => {
      const { imgUrl, answer } = req.body
      Tesseract.recognize(imgUrl)
      .then(result => {
          const trimmedResult = result.toLowerCase().replace(/\s+/g, '')
          if (trimmedResult == answer) {
              res.send({ answer: correct })
          }
              res.send({ answer: incorrect })
      })
      .catch(next) 
  })

QuestionsRouter
  .route('/:question_id')
  .all(checkQuestionExists)
  .get((req, res) => {
    res.json(res.question)
  })

/* async/await syntax for promises */
async function checkQuestionExists(req, res, next) {
  try {
    const question = await QuestionsService.getById(
      req.app.get('db'),
      req.params.question_id
    )

    if (!question)
      return res.status(404).json({
        error: `Question doesn't exist`
      })

    res.question = question
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = QuestionsRouter