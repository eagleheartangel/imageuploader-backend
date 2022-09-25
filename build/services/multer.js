"use strict";

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('uuid'),
    uuidv4 = _require.v4; // SET STORAGE


var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'src/uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, uuidv4(), _path["default"].extname(file.originalname));
  }
});

module.exports = storage;