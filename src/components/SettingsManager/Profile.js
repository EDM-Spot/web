import cx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import useIntl from '../../hooks/useIntl';
import Avatar from '../Avatar';
import UserRoles from '../UserCard/UserRoles';
import ChangeUsernameButton from './ChangeUsernameButton';
import 'react-circular-progressbar/dist/styles.css';
import { currentUserSelector } from '../../selectors/userSelectors';

function Profile({ className, user, onChangeUsername }) {
  const { dateTimeFormatter } = useIntl();

  const currentUser = useSelector(currentUserSelector);

  const expPerLevel = {
    0: 0,
    1: 12,
    2: 45,
    3: 180,
    4: 1350,
    5: 3000,
    6: 8400,
    7: 12500,
    8: 18900,
    9: 26150,
    10: 34875,
    11: 44000,
    12: 55500,
    13: 69225,
    14: 85575,
    15: 110550,
    16: 139290,
    17: 173450,
    18: 212450,
    19: 262025,
    20: 315450,
    21: 371375,
    22: 427392,
    23: 483409,
    24: 539426,
    25: 595442,
  };

  return (
    <div className={cx('SettingsPanelProfile', className)}>
      <Avatar
        className="SettingsPanelProfile-avatar"
        user={user}
      />
      <div className="SettingsPanelProfile-textblock">
        <h2 className="SettingsPanelProfile-username">
          {user.username}
          <ChangeUsernameButton
            onChangeUsername={onChangeUsername}
            initialUsername={user.username}
          />
        </h2>
        <UserRoles roles={user.roles} />
        <p className="SettingsPanelProfile-date">
          {dateTimeFormatter.format(new Date(user.createdAt))}
        </p>
      </div>
      <div className="SettingsPanelProfile-pointsblock">
        <strong>Points: {currentUser.points}</strong>
      </div>
      <div className="SettingsPanelProfile-levelblock">
        <div style={{ width: '40%', float: 'right' }}>
          <CircularProgressbarWithChildren
            value={currentUser.exp}
            minValue={expPerLevel[currentUser.level]}
            maxValue={expPerLevel[currentUser.level + 1]}
            styles={buildStyles({
              pathColor: '#9d2053',
            })}
          >
            <div style={{ fontSize: 20 }}>
              <strong>Level: {currentUser.level}</strong>
            </div>
            <div style={{ fontSize: 14 }}>
              <strong>{currentUser.exp}/{expPerLevel[currentUser.level + 1]}</strong>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
};

export default Profile;
