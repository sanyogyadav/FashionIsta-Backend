const path = require('path')
const multer = require('multer')

module.exports = folderName => {
    return multer({
        fileFilter: (req, file, cb) => {
            const ex = path.extname(file.originalname);
            if(
            ex !== '.png' &&
            ex !== '.jpg' &&
            ex !== '.jpeg'
            ){
                return cb(new Error('Only images are allowed'))
            }
            cb(null, true);
        },
        dest:`public/uploads/${folderName}`
    });
}