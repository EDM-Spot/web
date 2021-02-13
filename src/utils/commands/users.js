import { register } from '../ChatCommands';
import { log, sendChat } from '../../actions/ChatActionCreators';
import { doChangeUsername } from '../../actions/UserActionCreators';

register(
  'nick',
  'Change your username.',
  {
    action: (name) => {
      if (name.length < 3 || name.length > 32) {
        return log('Username must be between 3 and 32 characters long.');
      }

      return doChangeUsername(name);
    },
  },
);

register(
  'me',
  'Say a message in the third person',
  {
    action: (...args) => {
      const message = args.join(' ');
      return sendChat(`_${message}_`, true);
    },
  },
);
