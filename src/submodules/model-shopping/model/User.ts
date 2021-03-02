import { BaseModel } from "../../base-model/model/BaseModel";

export class User extends BaseModel{
    name ?: string;
    CMND ?: string;
    phone ?: string;
    email ?: string;
    birthAt ?: Date;
    gender ?: string;
    address ?: any;
    image ?: string;
    token ?: string;

}

