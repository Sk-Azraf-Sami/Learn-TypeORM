import express, { Request, Response } from 'express'
import { Banker } from '../entities/Banker';

const router = express.Router(); 

router.post('/api/banker', async (req: Request, res: Response) =>{
   try{
     const {
        first_name, 
        last_name, 
        middle_name, 
        email, 
        card_number,
        employee_number
    } = req.body

    const banker = Banker.create({
        first_name: first_name,
        middle_name: middle_name, 
        last_name: last_name, 
        email: email, 
        card_number: card_number,
        employee_number: employee_number
    })

    await banker.save();
    return res.json(banker); 
   }
   catch(error){
     return res.status(500).json({
        message: "Internal server error", 
        error: error instanceof Error ? error.message : String(error)
     })
   }
})

export {router as createBankerRouter}