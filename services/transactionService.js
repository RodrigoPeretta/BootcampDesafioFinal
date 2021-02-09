import mongoose from 'mongoose';
import { logger } from '../config/logger.js';
import { TransactionModel } from '../models/TransactionModel.js';

const ObjectId = mongoose.Types.ObjectId;

const findAll = async (req, res) => {
  try {
    const period = req.query.period;

    if (!period) {
      throw new Error(
        'É necessário informar o parâmetro "periodo", cujo valor deve estar no formato yyyy-mm'
      );
    }

    var condition = { yearMonth: period };

    const result = await TransactionModel.find(condition);

    res.send(result);
    logger.info(`GET /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await TransactionModel.findByIdAndDelete({ _id: id });

    res.send('Registro deletado');
    logger.info(`Delete /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao deletar o documento' });
    logger.error(`Delete /transaction - ${JSON.stringify(error.message)}`);
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await TransactionModel.findByIdAndUpdate({ _id: id }, obj);

    res.send(obj);
    logger.info(`Update /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao atualizar o documento' });
    logger.error(`Update /transaction - ${JSON.stringify(error.message)}`);
  }
};

const insert = async (req, res) => {
  try {
    const obj = req.body;
    const result = await TransactionModel.create(obj);

    res.send(result);
    logger.info(`Create /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao adicionar o documento' });
    logger.error(`Create /transaction - ${JSON.stringify(error.message)}`);
  }
};

export default { findAll, deleteById, updateById, insert };
