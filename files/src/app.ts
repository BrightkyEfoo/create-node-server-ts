import config from 'config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 9000;
const app = express();
app
  .use(
    cors({
      origin: '*',
    })
  )
  .use(express.json())
  .use(morgan('dev'));

app
  .use('/public', express.static('assets'))
  .use(favicon('./assets/images/favicon.ico'));

app.get('/', (req, res) => {
  res.send('it works. Done by BrightkyEfoo');
});
// Do your logic here

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
