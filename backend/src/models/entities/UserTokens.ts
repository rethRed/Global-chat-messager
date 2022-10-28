import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "./Users"

@Entity()
export class UserTokens extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(type => Users, (Users) => Users.id,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    @JoinColumn({ name: "user_id" })
    users!: Users
    
    @Column({ type: "text" })
    token!: string



      
}
