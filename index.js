import SockJS from 'sockjs-client';

function createSockJS(url, options, events) {
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

  return socket;
}

function createSockJSMiddleware(sock) {
  return ({ dispatch }) => {
    sock.onmessage = function onmessage(msg) {
      const message = JSON.parse(msg.data);

      if (message.event in this.events) {
        dispatch(this.events[message.event](message.data));
      }
    };

    return next => action => next(action);
  };
}

export default { createSockJS, createSockJSMiddleware };
