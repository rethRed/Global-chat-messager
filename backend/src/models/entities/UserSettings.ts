import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { Users } from "./Users"

@Entity()
export class UserSettings extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(type => Users, (UserSettings) => UserSettings,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    users!: Users
    
    @Column({ })
    img_path!: string
    
    @Column({type: "text"})
    description!: string

}
