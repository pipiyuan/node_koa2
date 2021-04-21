const Koa = require('koa');
const router = require('koa-router')(); // 注意require('koa-router')返回的是函数:
const koaBody = require('koa-body'); //koa-bodyparser 和 koa-multer
const proxy = require('koa-server-http-proxy')


const cors = require('./tool/cors'); // cors 处理 参照 koa2-cors
const controller = require('./controller'); // 导入controller middleware:

const app = new Koa(); //跨域处理

// 在合适的位置加上：由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(cors());
app.use(koaBody({
    multipart: true
}));
app.use(controller());

app.use(proxy('/open/', {
    target: 'https://fssit.fbank.com',
    pathRewrite: {
        '^/open': '/'
    },
    changeOrigin: true
}))

// 在端口3000监听:
app.listen(3001);
console.log('app started at port 3001...');