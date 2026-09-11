import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import { User } from "./Users.js";

@Entity("situations")
export class Situation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nameSituation!: string;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updateAt!: Date;

    @OneToMany(() => User, (user) => user.situation)
    users!: User[];
}