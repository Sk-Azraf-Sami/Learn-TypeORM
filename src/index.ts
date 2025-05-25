import  {DataSource} from 'typeorm'
import { Client } from './entities/Client'
import { Banker } from './entities/Banker'
import { Transactions } from './entities/Transactions'
import express from 'express'
import { createClientRouter } from './routes/create_client'
import { createBankerRouter } from './routes/create_banker'
import { createTransactionRouter } from './routes/create_transaction'
import { connectBankerToClientRouter } from './routes/connect_banker_to_client'
import { deleteClientRouter } from './routes/delete_client'

const app = express(); 

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", 
    port: 5432, 
    username: "postgres", 
    password: "1234",
    database: "learntypeorm", 
    /*
    entities: []
    This is where you list your 
    TypeORM entity classes (models). 
    An empty array means no entities 
    are registered, so no tables will 
    be created or managed.

    synchronize: true
    TypeORM will automatically create or 
    update the database tables to match 
    your entity classes every time the app starts.
    */
    entities: [Client, Banker, Transactions], 
    synchronize: true
})

AppDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized")

        app.use(express.json()); 
        app.use(createClientRouter); 
        app.use(createBankerRouter); 
        app.use(createTransactionRouter);
        app.use(connectBankerToClientRouter); 
        app.use(deleteClientRouter); 
        
        // start express server with DB connection 
        app.listen(8080, ()=>{
            console.log('Server running on port 8080');
        })
    })
    .catch((err)=>{
        console.error("Error during data source initialized", err)
    })

console.log("test!");