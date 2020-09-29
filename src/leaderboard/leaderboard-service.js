const LeaderboardService = {
  getTopTen(db) {
    return db
      .from('drivia_leaderboard AS dl')
      .select(
        'dl.id',
        'dl.date_created',
        'dl.user_id',
        'dl.score',
        ...userFields,
      )
      .leftJoin(
        'drivia_users AS usr',
        'dl.user_id',
        'usr.id',
      )
      .groupBy('dl.id', 'usr.id')
      .orderBy('dl.score', 'desc')
      .limit(10)
  },

  getById(db, id) {
    return db
      .from('drivia_leaderboard AS dl')
      .select(
        'dl.id',
        'dl.date_created',
        'dl.user_id',
        'dl.score',
        ...userFields,
      )
      .leftJoin(
        'drivia_users AS usr',
        'dl.user_id',
        'usr.id',
      )
      .groupBy('dl.id', 'usr.id')
      .where('dl.id', id)
      .first()
  },

  postScore(db, newScore) {
    return db
      .insert(newScore)
      .into('drivia_leaderboard')
      .returning('*')
      .then(([score]) => score)
      .then(score =>
        LeaderboardService.getById(db, score.id)
      )
  },
}

const userFields = [
    'usr.id AS user:id',
    'usr.user_name AS user:user_name',
    'usr.date_created AS user:date_created',
]

module.exports = LeaderboardService