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

  const requestConfig : any = {};
  if(method){
    requestConfig.method = method;
  }
  if(header && Object.keys(header).length !== 0){
    requestConfig.headers = {
      "Content-Type": "application/json",
      ...header,
    }
  }
  if(body && Object.keys(body).length !== 0){
    requestConfig.body = JSON.stringify(body);
  }

  if(cache){
    requestConfig.cache = cache;
  }

  try {
    const result = await fetch(url, requestConfig);
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

  const { urls, methods, headers, bodies, caches } = config;
  const successesArray : boolean[] = [];
  urls.forEach(() => {
    successesArray.push(false);
  })

  const returnObject: IMultipleQueriesReturnRes<T, E> = {
    successes: successesArray,
    errors: null,
    responses: null,
  };

  try {
    const responses = await Promise.all(urls.map((url, index) => {
      
      const requestConfig : any = {};
      if(methods?.[index]){
        requestConfig.method = methods?.[index];
      }

      if(headers?.[index] && Object.keys(headers?.[index]).length !== 0){
        requestConfig.headers = {
          "Content-Type": "application/json",
          ...headers?.[index],
        }
      }
      
      if(bodies?.[index] && Object.keys(bodies?.[index]).length !== 0){
        requestConfig.body = JSON.stringify(bodies?.[index]);
      }

      if(caches?.[index]){
        requestConfig.cache = caches?.[index]
      }

      return fetch(url, requestConfig)
    }));
    const allPromiseReslts = await Promise.all(responses.map(async (response, index) => {
      if(response.ok){
        successesArray[index] = true;
        return await response.json();
      }else{
        successesArray[index] = false;
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
