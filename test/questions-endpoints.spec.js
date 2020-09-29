const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

const testAnswer = "data:image/png;base64,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"

describe('Questions Endpoints', function() {
  let db

  const {
    testQuestions,
    testUsers,
  } = helpers.makeDriviaFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/questions`, () => {
    beforeEach('insert questions', () =>
      helpers.seedQuestionsTables(
        db,
        testUsers,
        testQuestions,
      )
    )

    it(`answers a question, responding with 201 and the result`, function() {
      const testQuestion = testQuestions[0]
      return supertest(app)
        .post('/api/questions')
        .send({imgUrl: testAnswer})
        .expect(200)
        .expect(res => {
          expect(res.body.data.text.toLowerCase().replace(/\s+/g, '')).to.eql(testQuestion.answer)
        })
    }).timeout(10000);
  })

  describe(`GET /api/questions`, () => {
    beforeEach('insert questions', () =>
      helpers.seedQuestionsTables(
        db,
        testUsers,
        testQuestions,
      )
    )

    it(`gets an array of questions by category, responding with 200 and the result`, function() {
      const expectedQuestions = testQuestions.filter(
          question => question.category === 'movies'
      )
      const testCategory = 'movies'
      return supertest(app)
        .get('/api/questions')
        .query({category: testCategory})
        .expect(200)
        .expect(res => {
          expect(res.body).to.deep.equalInAnyOrder(expectedQuestions)
        })
    })
  })

  describe(`GET /api/questions/:question_id`, () => {
    beforeEach('insert questions', () =>
      helpers.seedQuestionsTables(
        db,
        testUsers,
        testQuestions,
      )
    )

    it(`gets a question by id, responding with 200 and the result`, function() {
        const questionId = 1
        const expectedQuestion = testQuestions.filter(
            question => question.id === 1
        )
        return supertest(app)
          .get(`/api/questions/${questionId}`)
          .expect(200)
          .expect(res => {
            expect([res.body]).to.eql(expectedQuestion)
          })
      })
  })
})