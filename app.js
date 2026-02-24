const express = require('express');

const app = express();
app.use(express.json());

const feedbackStore = [];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/feedback', (req, res) => {
  res.status(200).json(feedbackStore);
});

app.post('/feedback', (req, res) => {
  const { user, comment } = req.body;
  const entry = { user, comment };
  feedbackStore.push(entry);
  res.status(201).json(entry);
});

module.exports = app;
