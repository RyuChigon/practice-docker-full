const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const PORT = 5000;

const app = express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`, (err, results, fileds) => {
  if (err) console.log('Failed create table');
  else console.log('Create table ', results);
});

app.get('/api/values', (req, res) => {
  db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).json(results);
  });
});

app.post('/api/value', (req, res) => {
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).json({ success: true, value: req.body.value });
    });
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));
