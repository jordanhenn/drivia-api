const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
      {
        id: 1,
        user_name: 'test-user-1',
        password: 'password',
        date_created: '2029-01-22T16:28:32.615Z',
      },
      {
        id: 2,
        user_name: 'test-user-2',
        password: 'password',
        date_created: '2029-01-22T16:28:32.615Z',
      },
      {
        id: 3,
        user_name: 'test-user-3',
        password: 'password',
        date_created: '2029-01-22T16:28:32.615Z',
      },
      {
        id: 4,
        user_name: 'test-user-4',
        password: 'password',
        date_created: '2029-01-22T16:28:32.615Z',
      },
    ]
  }
  
  function makeQuestionsArray() {
    return [
      {
        id: 1,
        question: 'Who is Eddie?',
        answer: 'doesntreallymatter',
        category: 'movies',
        points: 200
      },
      {
        id: 2,
        question: 'Who is Donnie?',
        answer: 'doesntreallymatter',
        category: 'movies',
        points: 200
      },
      {
        id: 3,
        question: 'Who is Greg?',
        answer: 'doesntreallymatter',
        category: 'science',
        points: 200
      },
      {
        id: 4,
        question: 'Who is Scottie?',
        answer: 'doesntreallymatter',
        category: 'science',
        points: 200
      },
    ]
  }
  
  function makeLeaderboardArray(users) {
    return [
      {
        id: 2,
        score: 500,
        user_id: users[1].id,
        date_created: '2029-01-22T16:28:32.615Z',
      },
      {
        id: 3,
        score: 400,
        user_id: users[2].id,
        date_created: '2029-01-22T16:28:32.615Z',
      },
      {
        id: 4,
        score: 300,
        user_id: users[3].id,
        date_created: '2029-01-22T16:28:32.615Z',
      },
    ];
  }
  
  
  function makeExpectedScores(user, scores) {
    const expectedScores = scores
      .filter(score => score.user_id === user.id)
  
    return expectedScores.map(score => {
      const scoreUser = users.find(user => user.id === score.user_id)
      return {
        id: score.id,
        score: score.score,
        date_created: score.date_created,
        user: {
          id: scoreUser.id,
          user_name: scoreUser.user_name,
          date_created: scoreUser.date_created,
        }
      }
    })
  }

  
  function makeDriviaFixtures() {
    const testUsers = makeUsersArray()
    const testQuestions = makeQuestionsArray()
    const testLeaderboard = makeLeaderboardArray(testUsers)
    return { testUsers, testQuestions, testLeaderboard }
  }
  
  function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        drivia_questions,
        drivia_leaderboard,
        drivia_users
        RESTART IDENTITY CASCADE`
    )
  }
  
  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('drivia_users').insert(preppedUsers)
      .then(() =>
        db.raw(
          `SELECT setval('drivia_users_id_seq', ?)`,
          [users[users.length -1 ].id],
        )
      )
  }
  
  function seedQuestionsTables(db, users, questions) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await seedUsers(trx, users)
      await trx.into('drivia_questions').insert(questions)
      await trx.raw(
               `SELECT setval('drivia_questions_id_seq', ?)`,
               [questions[questions.length - 1].id],
             )
    })
  }

  function seedLeaderboardTable(db, users, scores) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await seedUsers(trx, users)
      await trx.into('drivia_leaderboard').insert(scores)
      await trx.raw(
               `SELECT setval('drivia_leaderboard_id_seq', ?)`,
               [scores[scores.length - 1].id],
             )
    })
  }

  function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }
  

  
  module.exports = {
    makeUsersArray,
    makeQuestionsArray,
    makeExpectedScores,
    makeLeaderboardArray,
  
    makeDriviaFixtures,
    cleanTables,
    seedQuestionsTables,
    seedLeaderboardTable,
    seedUsers,
    makeAuthHeader
  }