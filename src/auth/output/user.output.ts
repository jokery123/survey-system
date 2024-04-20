import { Expose } from "class-transformer";
import { User } from "../user.entity";

export class UserOutput {
    constructor(partial?: Partial<UserOutput>) {
        Object.assign(this, partial);
      }
      
    @Expose()
    user: User

    @Expose()
    token: string;

}