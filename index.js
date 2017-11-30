import SockJS from 'sockjs-client';

export const createSockJS = (url, options, events) => {
  const socket = new SockJS(url, options);
  const sockCommandsBuffer = [];
  socket.events = events;
  socket.onopen = () => {
    sockCommandsBuffer.forEach((command) => {
      this.send(command);
    });
  };

  socket.onclose = () => {};

  socket.send = (data) => {
    if (socket.readyState === 1) {
      this.send(JSON.stringify(data));
    } else {
      sockCommandsBuffer.push(data);
    }
  };

  function callback(dispatch) {
    socket.onmessage = function onmessage(msg) {
      const message = JSON.parse(msg.data);

      if (message.event in socket.events) {
        dispatch(this.events[message.event](message.data));
      }
    };
  }

  return callback;
};

export const createSockJSMiddleware = callback => ({ dispatch }) => {
  callback(dispatch);

  return next => action => next(action);
};
