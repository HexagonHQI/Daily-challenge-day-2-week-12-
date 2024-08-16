const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for session management
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Import the quiz router
const quizRouter = require('./routes/quiz');
app.use('/quiz', quizRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
