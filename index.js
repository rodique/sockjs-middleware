import SockJS from 'sockjs-client';

const createSockJS = (url, options, events) => {
  const socket = new SockJS(url, options);
  const sockCommandsBuffer = [];
  socket.events = events;
  socket.onopen = () => {
    console.log('Opened');
    sockCommandsBuffer.forEach((command) => {
      this.send(command);
    });
  };

  socket.onclose = () => {
    console.log('Closed');
  };

  socket.send = (data) => {
    console.log("Data ", data);
    if (socket.readyState === 1) {
      this.send(JSON.stringify(data));
    } else {
      sockCommandsBuffer.push(data);
    }
  };

  function callback(dispatch) {
    socket.onmessage = function onmessage(msg) {
      console.log("Message ", msg);
      const message = JSON.parse(msg.data);

      if (message.event in socket.events) {
        dispatch(this.events[message.event](message.data));
      }
    };
  }

  return callback;
};

const createSockJSMiddleware = callback => ({ dispatch }) => {
  callback(dispatch);

  return next => action => next(action);
};

export {
  createSockJS,
  createSockJSMiddleware,
};
