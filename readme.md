node-koa2-demo
===========================

###########环境依赖
node v7.6+
mysql 5.7

###########部署步骤
1. 添加系统环境变量
    

2. npm install  //安装node运行环境

3. npm start   //前端编译




###########目录结构描述

├── controllers                 // 路由
│   ├── hello.js                // hello字段路由
│   ├── index.js         		// index字段路由
│   └── kitty.js               	// kitty字段路由
│
├── views                       // html模板
│   └── hello.html              
│
├── node_modules
├── db                          // mysql model配置
│   ├── config.js
│   ├── db.js
│   ├── db_init.js
│   ├── model.js
│   └── models					// 多table 模板
│   	├── Pet.js 				
│   	└── User.js 			
│
├── app.js
├── controller.js 				// 路由配置
├── nunjucks.js 				// 模板引擎 配置
├── Readme.md                   // help
└── package.json



###########V1.0.0 版本内容更新
1. 新功能	 aaaaaaaaa
2. 新功能	 bbbbbbbbb
3. 新功能	 ccccccccc
4. 新功能	 ddddddddd