import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/Person";

// Decorator 
@Entity('banker')
export class Banker extends Person {

    @Column({
        unique: true, 
        length: 10
    })
    employee_number: string; 
}