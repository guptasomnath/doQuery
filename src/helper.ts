import { IMultiQueryProps, ISingleQueryProps } from "./types";

export interface IDoQueryReturnResponse<T, E> {
  success: boolean;
  response: T | null;
  error: E | null;
}

export const doSingleQuery = async <T, E = Error>(
  config: ISingleQueryProps
) => {
  const { url, method, header, body, cache } = config;

  const returnObject: IDoQueryReturnResponse<T, E> = {
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

export const doMultipleQuery = async <T, E = Error>(
  config: IMultiQueryProps
) => {
  const returnObject: IDoQueryReturnResponse<T, E> = {
    success: false,
    error: null,
    response: null,
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
      returnObject.response = item
    })
  
    returnObject.response = allPromiseReslts.filter(item => !item.error) as T;
    const errorsList = allPromiseReslts.filter(item => item.error);
    returnObject.error = errorsList.map((item) => item.error) as E;
    
  } catch (error) {
    returnObject.error = error as E;
  }

  return returnObject;

};
