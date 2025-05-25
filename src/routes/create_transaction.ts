import express from 'express'; 
import { Client } from '../entities/Client';
import { Transactions, TransactionsType } from '../entities/Transactions';
const router = express.Router();

router.post('/api/client/:clientId/transaction', async(req, res)=>{
    const {clientId} = req.params; 
    const {transaction_type, amount} = req.body; 

    const client = await Client.findOne({ where: { id: parseInt(clientId) } });
    if(!client){
        return res.json({
            msg: "Client no found!"
        })
    }

    const transaction = Transactions.create({
        transaction_type,
        amount, 
        client
    });

    await transaction.save(); 


    if(transaction_type === TransactionsType.DEPOSIT){
        client.balance = client.balance + amount; 
    }
    else if(transaction_type === TransactionsType.WITHDRAW){
        client.balance = client.balance - amount; 
    }
    await client.save(); 

    return res.json({
        msg: "Transaction added"
    }); 
})

export {router as createTransactionRouter}