import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('broccoli app api');
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
