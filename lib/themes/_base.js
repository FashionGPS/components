'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _colors = require('../styles/colors');

var _colors2 = _interopRequireDefault(_colors);

var _breakpoints = require('../styles/breakpoints');

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _elevations = require('../styles/elevations');

var _elevations2 = _interopRequireDefault(_elevations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (theme) {
  return '\n  html, body, body > div:first-of-type, #__next {\n    height: 100%;\n    margin: 0;\n\n    color: ' + _colors2.default.textBlack + ';\n    font-family: Roboto, sans-serif;\n  }\n\n  [data-reactroot] {\n    min-height: 100%;\n  }\n\n  * {\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n  }\n\n  .display4 {\n    font-size: 112px;\n    font-weight: 300;\n    line-height: 112px;\n  }\n  .display3 {\n    font-size: 56px;\n    line-height: 56px;\n  }\n  .display2 {\n    font-size: 45px;\n    line-height: 48px;\n  }\n  .display1 {\n    font-size: 34px;\n    line-height: 40px;\n  }\n  .headline {\n    font-size: 24px;\n    line-height: 28px;\n  }\n  .title {\n    font-size: 20px;\n    font-weight: 500;\n    line-height: 32px;\n  }\n  .subheading {\n    font-size: 16px;\n    line-height: 20px;\n  }\n  @media ' + _breakpoints2.default.ml + ' {\n    .subheading {\n      font-size: 15px;\n    }\n  }\n  .body2 {\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 24px;\n  }\n  @media ' + _breakpoints2.default.ml + ' {\n    .body2 {\n      font-size: 13px;\n    }\n  }\n  .body1 {\n    font-size: 14px;\n    line-height: 20px;\n  }\n  @media ' + _breakpoints2.default.ml + ' {\n    .body1 {\n      font-size: 13px;\n    }\n  }\n  .caption {\n    font-size: 12px;\n    line-height: 16px;\n  }\n  .button {\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 16px;\n\n    text-transform: uppercase;\n  }\n\n  .dataTable th { font-weight: 500; }\n\n\n  .dp0 { ' + _elevations2.default.dp0 + ' }\n  .dp2 { ' + _elevations2.default.dp2 + ' }\n  .dp3 { ' + _elevations2.default.dp3 + ' }\n  .dp4 { ' + _elevations2.default.dp4 + ' }\n  .dp6 { ' + _elevations2.default.dp6 + ' }\n  .dp8 { ' + _elevations2.default.dp8 + ' }\n  .dp12 { ' + _elevations2.default.dp12 + ' }\n  .dp16 { ' + _elevations2.default.dp16 + ' }\n  .dp24 { ' + _elevations2.default.dp24 + ' }\n\n  .raisedButton {\n    background-color: ' + theme.primary + ';\n  }\n\n  .raisedButton:focused {\n    background-color: ' + (0, _color2.default)(theme.primary).darken(0.12).rgb().string() + ';\n  }\n\n  .progressIndicator.circular {\n    width: 60px;\n    height: 60px;\n  }\n\n  .progressIndicator.circular .path {\n    stroke: ' + theme.primary + ';\n  }\n';
};