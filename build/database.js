"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var port = process.env.PORT || 8080;
_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connect(process.env.DB_LOCAL).then(function () {
  _app["default"].listen(port, function () {
    console.log('Server on port ' + port);
  });
})["catch"](function (error) {
  return console.log(error);
});