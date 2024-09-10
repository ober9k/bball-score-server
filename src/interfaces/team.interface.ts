import * as mongodb from "mongodb";

export interface Team {
    _id?: mongodb.ObjectId;
    name: string;
}
