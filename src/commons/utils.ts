import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { QueryDataConfigInput } from "./graphql/query-data-config.input";

export function getRequestFromContext(context: ExecutionContext) {
    return context.switchToHttp().getRequest() || GqlExecutionContext.create(context).getContext().req;
}

export function normalizeQueryDataConfig(queryDataConfig: QueryDataConfigInput): QueryDataConfigInput {
    if(!queryDataConfig) {
        queryDataConfig  = {} as QueryDataConfigInput;
    }
    if(queryDataConfig.limit <= 0) {
        queryDataConfig.limit = 100;
    }
    if(queryDataConfig.skip < 0) {
        queryDataConfig.skip = 0;
    }
    return queryDataConfig;
}