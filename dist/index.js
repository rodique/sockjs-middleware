'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSockJSMiddleware = exports.createSockJS = undefined;

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSockJS = function createSockJS(url, options, events) {
  var socket = new _sockjsClient2.default(url, options);
  var sockCommandsBuffer = [];
  socket.events = events;
  socket.onopen = function () {
    sockCommandsBuffer.forEach(function (command) {
      undefined.send(command);
    });
  };

  socket.onclose = function () {};

  socket.send = function (data) {
    if (socket.readyState === 1) {
      undefined.send(JSON.stringify(data));
    } else {
      sockCommandsBuffer.push(data);
    }
  };

  function callback(dispatch) {
    socket.onmessage = function onmessage(msg) {
      var message = JSON.parse(msg.data);

      if (message.event in socket.events) {
        dispatch(this.events[message.event](message.data));
      }
    };
  }

  return callback;
};

var createSockJSMiddleware = function createSockJSMiddleware(callback) {
  return function (_ref) {
    var dispatch = _ref.dispatch;

    callback(dispatch);

    return function (next) {
      return function (action) {
        return next(action);
      };
    };
  };
};

exports.createSockJS = createSockJS;
exports.createSockJSMiddleware = createSockJSMiddleware;
