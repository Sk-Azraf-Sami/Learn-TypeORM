import express, { Request, Response } from 'express'
import { Client } from '../entities/Client';

const router = express.Router(); 

router.post('/api/client', async (req: Request, res: Response) =>{
   try{
     const {
        first_name, 
        last_name, 
        middle_name, 
        email, 
        card_number,
        balance
    } = req.body

    const client = Client.create({
        first_name: first_name,
        middle_name: middle_name, 
        last_name: last_name, 
        email: email, 
        card_number: card_number,
        balance: balance
    })

    await client.save();
    return res.json(client); 
   }
   catch(error){
     return res.status(500).json({
        message: "Internal server error", 
        error: error instanceof Error ? error.message : String(error)
     })
   }
})

export {router as createClientRouter}