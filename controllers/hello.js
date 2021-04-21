const mysql = require('mysql');
const Sequelize = require('sequelize');
const config = require('../db/config.js'); 
  
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

let Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

// 添加 数据
let addData = async () => {
	var now = Date.now();

	var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('create success');
}

// 查询 数据
let queryData = async () => {
    var pets = await Pet.findAll({
        // where: {
        //     name: 'Gaffey'
        // }
    });
    console.log(`find ${pets.length} pets:`);
    return pets;
};

// 更新 数据
let updateData = async () => {
    var p = await queryFromSomewhere();
    p.gender = true;
    p.updatedAt = Date.now();
    p.version ++;
    await p.save();
};

// 删除 数据
let delData = async () => {
    var p = await queryFromSomewhere();
    await p.destroy();
};


var fn_hello = async (ctx, next) => {
	// var data = await queryData();
    // var name = ctx.params.name;
    // ctx.response.body = `<h1>Hello, ${data[0].name}!</h1>`;
    console.log("login-password", ctx.cookies.get("login-password"))
    ctx.response.body = "safsf"
};

module.exports = {
    'GET /hello/:name': fn_hello
};