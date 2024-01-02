import { doMultipleQueries } from "./helper";
import { IMultiQueriesProps } from "./types";

export const doQueries = async <T, E = Error[]> (config : IMultiQueriesProps) => {
    return await doMultipleQueries<T, E>(config);
}