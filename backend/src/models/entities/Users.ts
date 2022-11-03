import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { UserSettings } from "./UserSettings"

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(type => UserSettings, (Users) => Users,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })


    @Column({ unique: true })
    userName!: string

    @Column({ unique: true })
    email!: string

    @Column({select: false})
    password!: string

      
}
