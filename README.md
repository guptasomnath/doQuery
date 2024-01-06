
# Do Query library

This library simplifies HTTP requests in any Node.js project. Say goodbye to try-catch complications, and easily handle multiple HTTP requests also.






## Installation

Install doQuery library in any node js project

```bash
npm i doquery 
```
```bash
yarn add doquery
```



## How to use it

if you want to do single query, use useQuery method
```javascript

import { doQuery } from "doquery";

const requestHeader = {
  "Content-Type" : "application/json"
}

const requestBody = {
  gmail : "usergmail@gmail.com",
  password : "userpassword"
}

const handleLoginBtn = async () => {

  const { response, error } = await doQuery({
    url : "https://demo.com/login",
    method : "POST", // optional. default is GET
    header : requestHeader, //optional
    body : requestBody, //optional,
    cache : "default" //optional 
  });

  if(error){
      setError(error?.message)
      return;
  }

  setResponse(response);

}
  
```

if you want to do multiple queries, use doQueries method

```javascript

import { doQueries } from "doquery";

const requestHeader1 = {
  "Content-Type" : "application/json"
}

const requestBody1 = {
  gmail : "usergmail@gmail.com",
  password : "userpassword"
}


const handleLoginBtn = async () => {

  const url1 = "https://demo.com/login";
  const url2 = "https://demo.com/getsecuritykey";

  const { responses, errors } = await doQueries({
    urls : [ url1, url2 ],
    methods : [ "POST", "GET" ], // optional
    headers : [ requestHeader1 ], //optional
    bodies : [ requestBody1 ], //optional,
    caches : [ "default", "force-cache" ] //optional 
  });

  if(errors.length != 0){
      errorList(errors)
      return;
  }
  responseList(responses)

}

```

### Contributing

See the [contribution guidelines](https://github.com/guptasomnath/doQuery/blob/main/CONTRIBUTING.md) before creating a pull request.


