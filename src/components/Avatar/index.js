import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

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

const Avatar = ({ className, user }) => (
  <div className={cx('Avatar', className)}>
    <CircularProgressbarWithChildren
      value={user.exp}
      minValue={expPerLevel[user.level]}
      maxValue={expPerLevel[user.level + 1]}
      strokeWidth={2}
      circleRatio={0.35}
      styles={buildStyles({
        strokeLinecap: 'butt',
      })}
    >
      <img
        className="Avatar-image"
        src={user.avatar || `https://sigil.u-wave.net/${encodeURIComponent(user._id)}`}
        alt={user.username}
      />
      <div style={{ fontSize: 8, marginTop: -15 }}>
        <strong>{user.level}</strong>
      </div>
    </CircularProgressbarWithChildren>
  </div>
);

Avatar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default Avatar;
