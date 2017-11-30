# sockjs-middleware

## Install
```
npm i --save https://github.com/rodique/sockjs-middleware.git
```

## Action
```javascript
export const updateBalance = data => ({
  type: 'UPDATE_BALANCE',
  payload: data.balance,
});
```

## Reducer
```javascript
const defaultState = {
  user: {
    balance: 0
  },
};

export default (state = defaultState, action) => {
  if (action.type === 'UPDATE_BALANCE') {
    return {
      user: {
        balance: action.payload,
      },
    };
  }

  return state;
};
```

## Store
```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createSockJS, createSockJSMiddleware } from 'sockjs-middleware';
import { updateBalance } from 'actions';

import reducers from './reducers';


const socketCallback = createSockJS(
  '/stream',
  { cookie: true },
  { balance: updateBalance },
);
const sockJSMiddleware = createSockJSMiddleware(socketCallback);

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sockJSMiddleware),
);

export default store;
```
