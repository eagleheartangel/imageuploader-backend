"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var _excluded = ["password", "_id"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var imageSchema = new _mongoose.Schema({
  url: {
    type: String
  },
  publicid: {
    type: String
  },
  description: String
}, {
  timestamps: true,
  versionKey: false,
  sparse: true
});
imageSchema.plugin(_mongoosePaginateV["default"]);

imageSchema.methods.toJSON = function () {
  var _this$toObject = this.toObject(),
      password = _this$toObject.password,
      _id = _this$toObject._id,
      image = _objectWithoutProperties(_this$toObject, _excluded);

  image.uid = _id;
  return image;
};

var _default = (0, _mongoose.model)('Image', imageSchema);

exports["default"] = _default;