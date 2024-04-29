const { Router } = require("express");

const multer = require("./middlewares/multer");
const { cutVideoController } = require("./useCases/CutVideo");
const { getVideoController } = require("./useCases/GetVideo");

//라우터 객체
const router = Router();

router.get('/', (_, response) => {
  return response.sendFile('/index.html');
});

//비디오 컷 요청
router.post('/cut', multer.single('raw'), (request, response) => {
  return cutVideoController.handle(request, response);
});

router.get('/cut/:name', (request, response) => {
  return getVideoController.handle(request, response);
});

module.exports = { router };