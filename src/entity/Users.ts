import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate
} from "typeorm";
import { Situation } from "./Situations.js";

import bcrypt from "bcryptjs";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    default: null
})
recoverPassword!: string | null;

    @ManyToOne(() => Situation, (situation) => situation.users)
    @JoinColumn({ name: "situationId" })
    situation!: Situation;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()

    async hashPassword(): Promise<void>{
        if(this.password){
             this.password = await bcrypt.hash(this.password, 10)
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }
}