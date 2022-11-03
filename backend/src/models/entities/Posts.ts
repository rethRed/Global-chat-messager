import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Users } from "./Users"

@Entity()
export class Posts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(type => Users, (Users) => Users.id,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    @JoinColumn({ name: "user_id" })
    users!: Users
    
    @CreateDateColumn()
    date!: Date

    @Column({ type: "longtext" })
    post!: string



      
}
