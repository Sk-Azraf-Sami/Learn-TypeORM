import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/Person";
import { Client } from "./Client";

// Decorator 
@Entity('banker')
export class Banker extends Person {

    @Column({
        unique: true,
        length: 10
    })
    employee_number: string;

    // one client has many bankers 
    // one banker has many clients 
    @ManyToMany(
        () => Client,
        //! Need to know why? 
        // it still work for relational constraints 
        // if I don't use it. 
        {
            "cascade": true
        }
    )
    @JoinTable({
        name: 'bankers_clients', 
        joinColumn:{
            name: 'banker', 
            referencedColumnName: 'id'
        }, 
        inverseJoinColumn: {
            name: 'client', 
            referencedColumnName: 'id'
        }
    })
    clients: Client[]
}