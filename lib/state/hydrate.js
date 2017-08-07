'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dehydrate = dehydrate;
exports.rehydrate = rehydrate;
exports.hotRehydrate = hotRehydrate;

var _mobx = require('mobx');

var _serializeJson = require('serialize-json');

var _serializeJson2 = _interopRequireDefault(_serializeJson);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 Dehydrate (on server)
*/
function dehydrate() {
  // convert store to json
  return _serializeJson2.default.encode((0, _mobx.toJS)(_store2.default.get(), true));
}

/**
  Rehydrate (on client)
*/
/* eslint no-undef: 0 */
/* eslint no-underscore-dangle: 0 */
function rehydrate() {
  // inject initial state into stores
  return _store2.default.set(window.__STATE);
}

/**
  HRM Rehydrate (on 'module.hot.accept')
*/
function hotRehydrate() {
  if (window.__STORE) {
    window.__STORE = _store2.default.set(_serializeJson2.default.decode(dehydrate(window.__STORE)));
  }
  if (!window.store) {
    window.__STORE = _store2.default.get();
  }
  return window.__STORE;
}