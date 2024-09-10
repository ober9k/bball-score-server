import * as mongodb from "mongodb";

export interface Season {
    _id?: mongodb.ObjectId;
    name: string;
}
