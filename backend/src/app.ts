import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import connection from './database/connection';

import routes from './routes';

connection.then(() => console.log('Conexão feita com o banco de dados'));

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export default app;
