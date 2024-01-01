export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type CatchType = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";

export interface ISingleQueryProps {
    method?: MethodType;
    url: string;
    header?: object;
    body?: object;
    cache?: CatchType;
}

export interface IMultiQueryProps {
    methods?: MethodType[];
    urls: string[];
    headers?: object[];
    bodies?: object[];
    caches?: CatchType[];
}
