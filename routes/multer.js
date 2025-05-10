let multer = require('multer');
let { v4: uuidv4 } = require('uuid');
let path = require('path');

// Storage setup
let storage = multer.diskStorage({
    destination: function (req, file, sr) {
        sr(null, './public/images/uploads');  // Make sure this folder exists
    },
    filename: function (req, file, sr) {
        const uniqueFilename = uuidv4();
        sr(null, uniqueFilename + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage });
module.exports = upload;  // Exporting the 'upload' variable
