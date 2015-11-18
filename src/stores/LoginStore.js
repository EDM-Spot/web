import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import dispatcher from '../dispatcher';

let jwt;
let user;
let error;

const LoginStore = assign(new EventEmitter, {
  getToken() {
    return jwt;
  },
  getUser() {
    return user;
  },
  getError() {
    return error;
  },

  dispatchToken: dispatcher.register(({ type, payload, error: isError }) => {
    switch (type) {
    case 'setSession':
      jwt = payload.jwt;
      user = null;
      error = null;
      LoginStore.emit('change');
      break;
    case 'loginComplete':
      if (isError) {
        jwt = null;
        user = null;
        error = payload;
      } else {
        jwt = payload.jwt;
        user = payload.user;
        error = null;
      }
      LoginStore.emit('change');
      break;
    case 'registerComplete':
      if (isError) {
        jwt = null;
        user = null;
        error = payload;
        LoginStore.emit('change');
      }
      break;
    case 'logoutComplete':
      jwt = null;
      user = null;
      error = null;
      LoginStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default LoginStore;