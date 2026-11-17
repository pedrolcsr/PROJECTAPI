import { Situation } from "./Situations.js";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    situation: Situation;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
//# sourceMappingURL=Users.d.ts.map