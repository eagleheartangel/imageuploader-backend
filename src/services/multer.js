import multer from 'multer';
import path from 'path';
const { v4: uuidv4 } = require('uuid');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, 'src/uploads');
  },
  filename: function (_, file, cb) {
    cb(null, uuidv4(), path.extname(file.originalname));
  },
});

module.exports = storage;
