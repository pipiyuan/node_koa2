const model = require('../db/model');
const nunjucks = require('../nunjucks');

let
    Pet = model.Pet,
    User = model.User;

(async () => {
    var user = await User.create({
        name: 'John',
        gender: false,
        email: 'john-' + Date.now() + '@garfield.pet',
        passwd: 'hahaha'
    });
    // console.log('created: ' + JSON.stringify(user));
    var cat = await Pet.create({
        ownerId: user.id,
        name: 'Garfield',
        gender: false,
        birth: '2007-07-07',
    });
    // console.log('created: ' + JSON.stringify(cat));
    var dog = await Pet.create({
        ownerId: user.id,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
    });
    // console.log('created: ' + JSON.stringify(dog));
})();


var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
	var data = await Pet.findAll({
        where: {
            name: name
        }
    });
    
    console.log(data)
    if(data.length){
        
        ctx.response.body = `<ul><li>Hello, ${data[0].id}!</li>
                             <li>Hello, ${data[0].name}!</li>
                             <li>Hello, ${data[0].birth}!</li>
                             <li>Hello, ${data[0].version}!</li>
                             <li>Hello, ${data[0].createAt}!</li></ul>`;
    }else{
        ctx.response.body = `<h1>没有哟!</h1>`;
    }
    
};
var fn_kitty = async (ctx, next) => {
    var name = ctx.params.name;
	var data = await User.findAll({
        where: {
            name: name
        }
    });
    
    // console.log(data)
    if(data.length){
        
        // ctx.response.body = `<h1>Hello, ${data[0].email}!</h1>
        //                      <h1>Hello, ${data[0].name}!</h1>
        //                      <h1>Hello, ${data[0].passwd}!</h1>
        //                      <h1>Hello, ${data[0].version}!</h1>
        //                      <h1>Hello, ${data[0].createAt}!</h1>`;
        ctx.response.body = nunjucks.render('hello.html', {data:data});

    }else{
        ctx.response.body = `<h1>没有哟!</h1>`;
    }
    
};

module.exports = {
    'GET /kitty/:name': fn_hello,
    'GET /kitty2/:name': fn_kitty
};