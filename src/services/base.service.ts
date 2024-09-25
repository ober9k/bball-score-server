import { Model } from "@/interfaces/model.interface";
import { Collection, Db, Filter, InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";

export abstract class BaseService<T extends Model> {

    protected db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public async find(): Promise<WithId<T>[]> {
        return this.getCollection().find().toArray();
    }

    public async findById(id: string): Promise<WithId<T> | null> {
        return this.getCollection().findOne(this.byId(id));
    }

    public async create(model: any): Promise<InsertOneResult<T> | null> {
        return this.getCollection().insertOne(model);
    }

    public async update(id: string, model: any): Promise<UpdateResult<T> | null> {
        return this.getCollection().updateOne(this.byId(id), { $set: model });
    }

    private byId(id: string): Filter<T> {
        /* workaround for type using Filter<T> */
        return { _id: new ObjectId(id) } as Filter<T>;
    }

    protected abstract getCollection(): Collection<T>;

}
