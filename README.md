# 博客系统（Koa）

> 基于Node.js环境。koa + mongodb 搭建的博客系统。

[点此查看运行效果 - 前台](http://blog.junn.top)

[点此查看运行效果 - 后台](http://blog.junn.top/admin/login)

博客系统API & 前台页面: 当前仓库

博客系统后台页面（Vue）： https://github.com/gaga-change/blog-admin

## 主要依赖

``` json
{
    "crypto": "^1.0.1",
    "koa": "^2.5.1",
    "koa-body": "^2.5.0",
    "koa-logger": "^3.2.0",
    "koa-mount": "^3.0.0",
    "koa-router": "^7.4.0",
    "koa-session": "^5.8.1",
    "koa-static-cache": "^5.1.2",
    "koa-views": "^6.1.4",
    "markdown-it": "^8.4.1",
    "mongoose": "^5.1.1",
    "only": "0.0.2",
    "swig": "^1.4.2"
  }
```

## 运行&打包

``` bash
# 下载依赖
npm install

# localhost:9876 运行
node ./app

```