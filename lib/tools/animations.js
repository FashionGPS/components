'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeAnimationFn = function makeAnimationFn(animation) {
  return function (properties) {
    return '\n    transition: ' + properties.split(' ').map(function (p) {
      return p + ' ' + animation;
    }).join(', ') + ';\n  ';
  };
};

// Can't create selectors from functions, so can't adjust for screen size
// with media queries
// Waiting on this: https://github.com/zeit/styled-jsx/issues/162
exports.default = {
  standard: makeAnimationFn('300ms cubic-bezier(0.4, 0, 0.2, 1)'),
  large: makeAnimationFn('375ms cubic-bezier(0.4, 0, 0.2, 1)'),
  entrance: makeAnimationFn('225ms cubic-bezier(0, 0, 0.2, 1)'),
  exit: makeAnimationFn('195ms cubic-bezier(0.4, 0, 1, 1)'),
  tempExit: makeAnimationFn('195ms cubic-bezier(0.4, 0, 0.6, 1)')
};