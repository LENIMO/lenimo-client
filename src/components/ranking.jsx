const express = require('express');
const app = express();

const rankingData = [
  { user_id: 1, user_name: 'User1', study_time: '2 hours' },
  { user_id: 2, user_name: 'User2', study_time: '3 hours' },
];

app.get('/api/getRanking', (req, res) => {
  res.json(rankingData);
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});