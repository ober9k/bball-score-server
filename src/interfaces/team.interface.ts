import { Model } from "@/interfaces/model.interface";
import * as mongodb from "mongodb";

export interface Team extends Model {
    name: string;
}
