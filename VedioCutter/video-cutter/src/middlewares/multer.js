//파일 업로드 처리 미들웨어

const multer = require("multer");
const uploadConfig = require("../config/multer");

module.exports = multer(uploadConfig);