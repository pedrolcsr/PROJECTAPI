import { Situation } from "./Situations.js";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    recoverPassword: string | null;
    situation: Situation;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}
//# sourceMappingURL=Users.d.ts.map