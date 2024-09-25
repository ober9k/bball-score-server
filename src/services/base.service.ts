import { Model } from "@/interfaces/model.interface";
import { Collection, Db, Filter, ObjectId, WithId } from "mongodb";

export abstract class BaseService<T extends Model> {

    protected db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public async find(): Promise<WithId<T>[]> {
        return this.getCollection().find().toArray();
    }

    protected abstract getCollection(): Collection<T>;

}
