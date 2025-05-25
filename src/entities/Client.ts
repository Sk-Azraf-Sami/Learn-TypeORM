import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn, Transaction, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/Person";
import { Transactions } from "./Transactions";
import { Banker } from "./Banker";

// Decorator 
@Entity('client')
export class Client extends Person {
    @Column({
       type: "numeric"
    })
    balance: number; 

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
    // one client has many transactions 
    @OneToMany(
        () => Transactions,
        transaction => transaction.client,
        {
            "onDelete": "CASCADE"
        }
    )
    transaction: Transactions[]; 

    // one client has many bankers 
    // one banker has many clients
    @ManyToMany(
        () => Banker,
        {
            "cascade": true
        }
    )
    bankers: Banker[]

}