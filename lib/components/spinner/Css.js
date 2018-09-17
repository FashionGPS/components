"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CssSpinner = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CssSpinner = exports.CssSpinner = function CssSpinner(_ref) {
  var type = _ref.type;
  return {
    bounce: _react2.default.createElement(
      "div",
      { className: "bounce-spinner" },
      _react2.default.createElement("div", { className: "bounce bounce1" }),
      _react2.default.createElement("div", { className: "bounce bounce2" }),
      _react2.default.createElement("div", { className: "bounce bounce3" })
    ),
    rays: _react2.default.createElement(
      "div",
      { className: "sk-fading-circle" },
      _react2.default.createElement("div", { className: "sk-circle1 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle2 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle3 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle4 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle5 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle6 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle7 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle8 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle9 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle10 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle11 sk-circle" }),
      _react2.default.createElement("div", { className: "sk-circle12 sk-circle" })
    )
  }[type];
};