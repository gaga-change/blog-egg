# 博客系统（API）

> 基于Node.js环境。Egg.js + mongodb 搭建的博客系统API。

API 使用 EGG.js + mongodb。

前台使用 Next.js + antd。项目地址：[blog-next](https://github.com/gaga-change/blog-next)

后台管理使用 Vue + ElementUI。项目地址：[blog-admin](https://github.com/gaga-change/blog-admin)

## 运行

``` bash
# 下载依赖
npm install

# localhost:9876 运行
npm run dev
```

## Docker 镜像

### 环境变量

`MONGODB_USERNAME` mongodb 用户名
`MONGODB_PASSWORD` mongodb 密码
`MONGODB_HOST` mongodb host地址
`MONGODB_PORT` mongodb 端口
`MONGODB_COLLECTION` mongodb 集合名称