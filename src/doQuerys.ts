import { doMultipleQuery } from "./helper";
import { IMultiQueryProps } from "./types";

export const doQuerys = async <T, E = Error[]> (config : IMultiQueryProps) => {
    return await doMultipleQuery<T, E>(config);
}