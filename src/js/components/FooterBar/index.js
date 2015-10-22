import cx from 'classnames';
import React from 'react';
import { togglePlaylistManager } from '../../actions/OverlayActionCreators';
import { openLoginModal, openRegisterModal } from '../../actions/LoginActionCreators';
import PlaylistStore from '../../stores/PlaylistStore';
import LoginStore from '../../stores/LoginStore';
import listen from '../../utils/listen';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';

function getState() {
  return {
    playlist: PlaylistStore.getActivePlaylist(),
    nextMedia: PlaylistStore.getActiveMedia()[0],
    user: LoginStore.getUser()
  };
}

@listen(PlaylistStore, LoginStore)
export default class FooterBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  state = getState();

  onChange() {
    this.setState(getState());
  }

  render() {
    const { user, playlist, nextMedia } = this.state;
    const className = cx('FooterBar', this.props.className);

    if (user && !user.isGuest) {
      return (
        <div className={className}>
          <div className="FooterBar-user">
            <UserInfo user={user} />
          </div>
          <div className="FooterBar-next">
            <NextMedia
              playlist={playlist}
              nextMedia={nextMedia}
              onClick={togglePlaylistManager}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={className}>
        <button
          className="FooterAuthButton FooterAuthButton--login"
          onClick={openLoginModal}
        >
          SIGN IN
        </button>
        <button
          className="FooterAuthButton FooterAuthButton--register"
          onClick={openRegisterModal}
        >
          REGISTER
        </button>
        <div className="FooterBar-guest">
          You have to log in if you want to play!
        </div>
      </div>
    );
  }
}
