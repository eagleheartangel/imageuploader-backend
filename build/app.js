"use strict";

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _image = _interopRequireDefault(require("./routes/image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { setup } from './libs/setup';
// setup();
var app = (0, _express["default"])();
app.use((0, _expressFileupload["default"])({
  limits: {
    fileSize: 10000000
  },
  abortOnLimit: true,
  createParentPath: true
}));
app.use((0, _compression["default"])());
app.use((0, _cors["default"])({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT']
}));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use('/api', _image["default"]);
module.exports = app;