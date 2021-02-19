import React from 'react';
import PropTypes from 'prop-types';
import UserNotificationMessage from './UserNotificationMessage';

const PlayMessage = ({
  user,
  song,
  timestamp,
}) => (
  <UserNotificationMessage
    type="userPlay"
    className="ChatMessage--userPlay"
    i18nKey="chat.userPlay"
    user={user}
    song={song}
    timestamp={timestamp}
  />
);

PlayMessage.propTypes = {
  user: PropTypes.object.isRequired,
  song: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default PlayMessage;
