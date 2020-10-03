# Drivia API
https://peaceful-basin-11084.herokuapp.com/api

# Drivia Client
https://drivia.vercel.app

# Client REPO
https://github.com/jordanhenn/drivia-client

## Endpoints

### /login & /register
Users can register new accounts and login to existing accounts

### GET /question
Must include query for category. Returns three questions from the category.

### POST /question
Submits image of users written answer in request body, put through Tesseract and returns digitalized text

### GET /question/:question-id
Returns a specific question.

### GET /leaderboard
Returns an array of the top ten scorers

### POST /leaderboard
Posts user's score to the leaderboard. User must be logged in to submit a score. 

### Tech Used
Express, PostgreSQL, Tesseract, Javascript, Node

## Summary
Drivia is an app where you answer in your own handwriting. User starts a quick game, selects three distinct categories, then answers nine questions (3 per category) by writing out their answers with either their mouse on their computer, or their finger on their mobile phone.
