const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Leaderboard Endpoints', function() {
  let db

  const {
    testLeaderboard,
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

  describe(`POST /api/leaderboard`, () => {
    beforeEach('insert scores', () =>
      helpers.seedLeaderboardTable(
        db,
        testUsers,
        testLeaderboard,
      )
    )

    it(`posts a score, responding with 201 and the created score`, function() {
      const testScore = 200
      return supertest(app)
        .post('/api/leaderboard')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send({ score: testScore })
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.score).to.eql(testScore.score)
          expect(res.body.user.id).to.eql(testUser.id)
          expect(res.headers.location).to.eql(`/api/leaderboard/${res.body.id}`)
          const expectedDate = new Date().toLocaleString()
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
    })
  })

  describe(`GET /api/leaderboard`, () => {
    beforeEach('insert scores', () =>
      helpers.seedLeaderboardTable(
        db,
        testUsers,
        testLeaderboard,
      )
    )

    it(`gets an array of current leading scorers, responding with 200 and the result`, function() {
      const expectedScores = [
        {
          id: 2,
          score: 500,
          "user:date_created": "2029-01-22T16:28:32.615Z",
          "user:id": 2,
          "user:user_name": "test-user-2",
          user_id: testUsers[1].id,
          date_created: '2029-01-22T16:28:32.615Z',
        },
        {
          id: 3,
          score: 400,
          "user:date_created": "2029-01-22T16:28:32.615Z",
          "user:id": 3,
          "user:user_name": "test-user-3",
          user_id: testUsers[2].id,
          date_created: '2029-01-22T16:28:32.615Z',
        },
        {
          id: 4,
          score: 300,
          "user:date_created": "2029-01-22T16:28:32.615Z",
          "user:id": 4,
          "user:user_name": "test-user-4",
          user_id: testUsers[3].id,
          date_created: '2029-01-22T16:28:32.615Z',
        },
      ];
      return supertest(app)
        .get('/api/leaderboard')
        .expect(200)
        .expect(res => {
          expect(res.body).to.deep.equalInAnyOrder(expectedScores)
        })
    })
  })
})