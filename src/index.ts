import  {DataSource} from 'typeorm'
import { Client } from './entities/Client'
import { Banker } from './entities/Banker'

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
    entities: [Client, Banker], 
    synchronize: true
})

AppDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized")
    })
    .catch((err)=>{
        console.error("Error during data source initialized", err)
    })

console.log("test!");