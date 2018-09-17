'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDataURL = isDataURL;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// got from https://gist.github.com/bgrins/6194623
function isDataURL(s) {
  if (!_lodash2.default.isString(s)) return false;
  return !!s.match(isDataURL.regex);
}

isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;