const { app } = require("./app");

const $PORT = process.env.PORT || 3333;
console.log("http://localhost:" + $PORT);
app.listen($PORT);