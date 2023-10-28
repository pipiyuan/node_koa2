const fs = require("fs");
const path = require("path");

var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx, next) => {
  var name = ctx.request.body.name || "",
    password = ctx.request.body.password || "";
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === "koa" && password === "12345") {
    ctx.cookies.set("login-password", password, {
      domain: "localhost:3002",
    });
    // ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="http://localhost:3001/hello/wewe">Welcome, ${name}</a></p>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
  }
};

const fn_download = async (ctx, next) => {
  let file = await fs.readFileSync(path.join(__dirname, "../readme.md"));
  ctx.attachment("name.txt");
  ctx.body = file;
};

module.exports = {
  "GET /": fn_index,
  "POST /signin": fn_signin,
  "GET /download": fn_download,
};
