import express from 'express';
import 'express-async-errors'

import requests from './routes/requests';
import error from './middlewares/error';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/requests', requests);
app.use(error);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));