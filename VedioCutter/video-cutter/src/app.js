//라우터

const express = require("express");
const { router } = require("./routes");
const { resolve } = require("path")

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, '..', 'public')));
app.use(express.static(resolve(__dirname, '..', 'temp', 'edited')));

//라우터 추가
app.use(router);

//서버 진입점
module.exports = { app };