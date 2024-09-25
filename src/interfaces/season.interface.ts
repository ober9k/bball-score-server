import { Model } from "@/interfaces/model.interface";
import * as mongodb from "mongodb";

export interface Season extends Model {
    name: string;
}
