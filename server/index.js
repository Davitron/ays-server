import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Welcome Empress of the known world!'))

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000, happy coding');
})