export type RequestMethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "TRACE" | "CONNECT";
export type CacheType = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";

export interface ISingleQueryProps {
    method?: RequestMethodType;
    url: string;
    header?: object;
    body?: object;
    cache?: CacheType;
}

export interface IMultiQueriesProps {
    methods?: RequestMethodType[];
    urls: string[];
    headers?: object[];
    bodies?: object[];
    caches?: CacheType[];
}

export interface ISingleQueryReturnRes<T, E> {
    success: boolean;
    response: T | null;
    error: E | null;
}

export interface IMultipleQueriesReturnRes<T, E> {
    success: boolean;
    responses: T | null;
    errors: E | null;
}
