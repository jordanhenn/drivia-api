const QuestionsService = {
getAllQuestions(db) {
    return db
      .from('drivia_questions')
      .select(
        'id',
        'question',
        'answer',
        'points',
        'category',
      )
  },
  getQuestionsByCategory(db, category) {
    return db
      .from('drivia_questions')
      .select(
        'id',
        'question',
        'answer',
        'points',
        'category',
      )
      .where({
          category: category, 
        })
      .orderBy(db.raw('RANDOM()'))
      .limit(3)
  },

  getById(db, id) {
    return QuestionsService.getAllQuestions(db)
      .where('id', id)
      .first()
  }
}

module.exports = QuestionsService