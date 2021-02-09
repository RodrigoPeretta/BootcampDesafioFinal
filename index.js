import express from 'express';
import cors from 'cors';
import { transactionRouter } from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
dotenv.config();

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;
db.url = DB_CONNECTION;

console.log('Iniciando conexão ao MongoDB...');

(async () => {
  try {
    await db.mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado ao MongoDB');
  } catch (error) {
    process.exit();
  }
})();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
app.use(express.static(path.join(process.cwd(), 'client/build')));

/**
 * Rota raiz
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api/transaction', transactionRouter);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.send(400, err.message);
});

/**
 * Definição de porta e
 * inicialização do app
 */
const APP_PORT = process.env.PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
