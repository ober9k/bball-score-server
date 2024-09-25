import * as mongodb from "mongodb";

export interface Model {
    _id?: mongodb.ObjectId;
}
