import { ISingleQueryProps } from "./types";
import { doSingleQuery } from "./helper";

export const doQuery = async <T, E = Error>(config : ISingleQueryProps) => {
    return await doSingleQuery<T, E>(config);
}