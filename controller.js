const fs = require('fs');
function addControllers(router, dirName) {
    var files = fs.readdirSync(__dirname + `/${dirName}`);
    var js_files = files.filter(f => f.endsWith('.js'));

    js_files.forEach(f=>{
        console.log(`process controller: ${f}...`);
        const mapping = require(__dirname + `/${dirName}/` + f);

        mapping.forEach(route=>{
            if (route.startsWith('GET ')) {
                var path = route.substring(4);
                router.get(path, mapping[route]);
                console.log(`register route mapping: GET ${path}`);
            } else if (route.startsWith('POST ')) {
                var path = route.substring(5);
                router.post(path, mapping[route]);
                console.log(`register URL mapping: POST ${path}`);
            } else {
                console.log(`invalid URL: ${route}`);
            }
        })
    })
}

// addControllers(router);
module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};