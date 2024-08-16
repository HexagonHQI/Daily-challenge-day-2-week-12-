const express = require('express');
const router = express.Router();

// Sample trivia quiz questions and answers
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" },
];

// Start the quiz and display the first question
router.get('/', (req, res) => {
  if (!req.session.questionIndex) {
    req.session.questionIndex = 0;
    req.session.score = 0;
  }
  const currentQuestion = triviaQuestions[req.session.questionIndex];
  res.json({ question: currentQuestion.question });
});

// Submit an answer and move to the next question
router.post('/', (req, res) => {
  const { answer } = req.body;
  const currentQuestion = triviaQuestions[req.session.questionIndex];

  if (answer === currentQuestion.answer) {
    req.session.score++;
  }

  req.session.questionIndex++;

  if (req.session.questionIndex < triviaQuestions.length) {
    const nextQuestion = triviaQuestions[req.session.questionIndex];
    res.json({ question: nextQuestion.question });
  } else {
    res.json({ message: 'Quiz finished', score: req.session.score });
    req.session.destroy();
  }
});

// Display the user’s final score
router.get('/score', (req, res) => {
  if (req.session.score !== undefined) {
    res.json({ score: req.session.score });
  } else {
    res.status(400).json({ message: 'No score available' });
  }
});

module.exports = router;


module.exports = router;
