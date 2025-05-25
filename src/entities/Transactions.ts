import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

export enum TransactionsType {
    DEPOSIT= "deposit",
    WITHDRAW = "withdraw"
}

@Entity('transactions')
export class Transactions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: TransactionsType 
    })
    transaction_type: string
    
    @Column({
        type: "numeric"
    })
    amount: number

    // one client has many transactions 
    // relationship between transaction and client 
    // need to create relation in 'client' table 
    // and also need to create relation in 'transaction' table 
    @ManyToOne(
        () => Client,
        client => client.transaction,
        // delete for relational constraints 
        {
            "onDelete": "CASCADE" 
        }
    )
    @JoinColumn({
        name: 'clinet_id'
    })
    client: Client
}