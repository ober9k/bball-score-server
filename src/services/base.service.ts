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

    public async findById(id: string): Promise<WithId<T> | null> {
        /* workaround for type using Filter<T> */
        return this.getCollection().findOne({ _id: new ObjectId(id) } as Filter<T>);
    }

    protected abstract getCollection(): Collection<T>;

}
