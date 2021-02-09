import express from 'express';
import TransactionModel from '../services/transactionService.js';

const app = express();

app.get('/', TransactionModel.findAll);
app.delete('/:id', TransactionModel.deleteById);
app.put('/:id', TransactionModel.updateById);
app.post('/', TransactionModel.insert);

export { app as transactionRouter };
