import { BaseModel } from "../../base-model/model/BaseModel";

export class Account extends BaseModel{
    username ?: string;
    password ?: string;
    type ?: TypeAccount;
    userId ?: string
}

export enum TypeAccount {
    admin = "admin",
    normal = "normal"
}