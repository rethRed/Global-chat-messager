import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Posts } from "./Posts"
import { Users } from "./Users"

@Entity()
export class Likes extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(type => Posts, (Posts) => Posts.id,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    @JoinColumn({ name: "post_id" })
    posts!: Posts
    
    @ManyToOne(type => Users, (Users) => Users.id,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    @JoinColumn({ name: "user_id" })
    users!: Users

    @Column()
    date!: Date



      
}
