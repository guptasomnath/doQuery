import { IMultiQueriesProps, IMultipleQueriesReturnRes, ISingleQueryProps, ISingleQueryReturnRes } from "./types";

export const doSingleQuery = async <T, E = Error>(
  config: ISingleQueryProps
) => {
  const { url, method, header, body, cache } = config;

  const returnObject: ISingleQueryReturnRes<T, E> = {
    success: false,
    error: null,
    response: null,
  };

  try {
    const result = await fetch(url, {
      method: method,
      cache: cache,
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
      body: JSON.stringify(body),
    });
    returnObject.success = result.ok;
    if (result.ok) {
      returnObject.response = (await result.json()) as T;
    } else {
      returnObject.error = (await result.json()) as E;
    }
  } catch (error: any) {
    returnObject.error = error as E;
  }

  return returnObject;
};

export const doMultipleQueries = async <T, E = Error>(
  config: IMultiQueriesProps
) => {
  const returnObject: IMultipleQueriesReturnRes<T, E> = {
    success: false,
    errors: null,
    responses: null,
  };

  const { urls, methods, headers, bodies, caches } = config;

  try {

    const responses = await Promise.all(urls.map((url, index) => fetch(url, {
      method : methods?.[index],
      headers : {
        "Content-Type" : "application/json",
        ...headers?.[index]
      },
      body : JSON.stringify(bodies?.[index]),
      cache : caches?.[index]
    })));
    const allPromiseReslts = await Promise.all(responses.map(async response => {
      if(response.ok){
        return await response.json();
      }else{
        return {error : await response.json()};
      }
    }));
  
    allPromiseReslts.forEach((item) => {
      returnObject.responses = item
    })
  
    returnObject.responses = allPromiseReslts.filter(item => !item.error) as T;
    const errorsList = allPromiseReslts.filter(item => item.error);
    returnObject.errors = errorsList.map((item) => item.error) as E;
    
  } catch (error) {
    returnObject.errors = error as E;
  }

  return returnObject;

};
