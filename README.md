# nodestart

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


//安装问题的一些:
+   cnpm install --save axios
+   根目录下添加:postcss.config.js:
```
写入module.exports = {
  plugins: {
    'autoprefixer': {browsers: 'last 5 version'}
  }
}
```
+ cnpm install express@next cors mongoose  服务器 

