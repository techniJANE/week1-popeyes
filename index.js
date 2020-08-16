const PORT = process.env.PORT || 3000;

const express = require('express');
const pg = require('pg');

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const app = express();
app.use(express.static('Public'));
app.use(express.json());

app.post('/clicks', async function(request, response) {
  const allInfo = request.body;
  console.log(allInfo.id);

  const result = await db.query(
    `INSERT INTO clicks (userId, time, target, tracking, clickX, clickY) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [
      allInfo.id,
      allInfo.time,
      allInfo.target,
      allInfo.tracking,
      allInfo.clickX,
      allInfo.clickY,
    ]
  );
  console.log(result);

  response.json({ click: 'tracked' });
});

db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
    id SERIAL PRIMARY KEY,
    time VARCHAR(200) NOT NULL,
    target VARCHAR(200) NOT NULL,
    tracking VARCHAR(200) NOT NULL,
    clickX VARCHAR(200) NOT NULL,
    clickY VARCHAR(200) NOT NULL,
    userId VARCHAR(200) NOT NULL
  );
`);

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
