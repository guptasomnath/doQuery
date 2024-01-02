
# Contributing to ReactPlayer

Thanks for contributing to ReactPlayer!

Running the demo locally is relatively easy:

```
git clone https://github.com/guptasomnath/doQuery.git
cd doQuery
npm install # or yarn
npm run build

```


`Make a new folder where you cloned the 'doQuery' repository and create an npm project using this command.`

```npm init --y```

![stape1](https://lh3.googleusercontent.com/d/1dOAoPESSeL0CSVQBIg-yzQG40xRfsWvG)

`Now, open your terminal in the 'test' folder and enter the following command to acquire the 'do query' package locally. Ensure that you also build the 'doQuery'.`

``` npm link ../doQuery ```

![stape2](https://lh3.googleusercontent.com/d/1kMg800OM15dL_qDbF1SfHF0CVt-pPjcc)

`Now test`

`node index.js`

![stape3](https://lh3.googleusercontent.com/d/1kMg800OM15dL_qDbF1SfHF0CVt-pPjcc)



## `build` files

There is **no need** to build or commit files in `build` after making changes. The `build` files are only there for [bower](http://bower.io) support, and there is very little point in polluting every commit or pull request with the changes. The `build` files will be automatically built and committed when new versions are released, so your changes will be included then.


