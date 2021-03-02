import { register } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';

import {
  doChangeDiscordID,
} from '../../actions/UserActionCreators';

register(
  'discord',
  'Link Discord. Syntax: "/discord 111111111111111111"',
  {
    action: (discordId) => (dispatch, getState) => {
      if (!discordId) {
        return dispatch(log('Provide a Discord ID.'));
      }

      return dispatch(doChangeDiscordID(discordId));
    },
  },
);
