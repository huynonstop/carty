import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/hello', (req, res) => {
  res.json({
    message: 'helloworld',
  });
});
export default app;
