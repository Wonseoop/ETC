const fs = require("fs");
const { resolve } = require("path");

//임시 폴더 생성
class CreateTemporaryFolder {
    constructor(path = '') {
        this.path = path;
    }

    //폴더 생성
    execute(recursive = false, ...args) {
        if(recursive === null || recursive === undefined) {
            recursive = false;
        }

        if(!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path, { recursive });
        }

        args.forEach(path => {
            path = resolve(this.path, path);

            if(!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive });
            }
        });
    }
}

module.exports = { CreateTemporaryFolder };