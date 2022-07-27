import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { QueryDataConfigInput } from "../graphql/query-data-config.input";
import { normalizeQueryDataConfig } from "../utils";

@Injectable()
export abstract class MongoBasicQueriesService<T> {
    private abstractModel: Model<T>;
    constructor(model: Model<T>) {
        this.abstractModel = model;
    }

    insertOne(payload: T): Promise<T> {
        return this.abstractModel.create(payload);
    }

    async findAll(queryConfig?: QueryDataConfigInput): Promise<T[]> {
        const { limit, skip } = normalizeQueryDataConfig(queryConfig);
        return this.abstractModel.find().skip(skip).limit(limit);
    }

    async findOneById(id: ObjectId) {
        return this.abstractModel.findById(id);
    }

    async findOneByIdOrFail(id: ObjectId) {
        const result = await this.findOneById(id);
        if(!result) {
            throw new NotFoundException(`L'entité avec id=${id} n'existe pas`);
        }
        return result;
    }
}
