import express from 'express'; 
import { Client } from '../entities/Client';
import { Transactions, TransactionsType } from '../entities/Transactions';
import { Banker } from '../entities/Banker';
const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async(req, res)=>{
  const {bankerId, clientId} = req.params; 
  const client = await Client.findOne({ where: { id: parseInt(clientId) } });
  const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });

  console.log(bankerId);
  console.log(clientId); 

  if(!banker || !client){
    return res.json({
        msg: "banker or client doesn't exist"
    })
  }

  banker.clients = [
    ...(banker.clients || []),
    client
  ]

  await banker.save();

  return res.json({
    msg: "Banker connected to client"
  })

})

export {router as connectBankerToClientRouter}