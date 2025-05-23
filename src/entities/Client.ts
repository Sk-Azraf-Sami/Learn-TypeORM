import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, Transaction, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/Person";
import { Transactions } from "./Transactions";

// Decorator 
@Entity('client')
export class Client extends Person {
  
    @Column({
        default: true, 
        // differnt name in class from database 
        name: "active"
    })
    is_active: boolean; 

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        age: number, 
        gender: string 
    }

    @Column({
        type: "simple-array",
        default: []
    })
    family_members: string[];

    // relationship between transaction and client 
    @OneToMany(
        () => Transactions,
        transaction => transaction.client
    )
    transaction: Transactions[]; 
}