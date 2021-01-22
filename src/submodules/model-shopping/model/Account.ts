import { BaseModel } from "@BaseTypes/model/BaseModel";

export class Account extends BaseModel{
    username ?: string;
    password ?: string;
}