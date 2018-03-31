import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent } from 'material-ui-next/Dialog'; // eslint-disable-line
import PreviewPlayer from '../../Video/Player';

const TITLE = 'preview-media-title';

function getTitle(media) {
  return `${media.artist} – ${media.title}`;
}

const PreviewMediaDialog = ({
  open,
  media,
  volume,
  onCloseDialog,
}) => (
  <Dialog
    classes={{
      root: 'AppColumn AppColumn--left',
      paper: 'Dialog PreviewMediaDialog',
    }}
    BackdropProps={{
      className: 'AppColumn AppColumn--full',
    }}
    open={open}
    onClose={onCloseDialog}
    maxWidth={false}
    aria-labelledby={TITLE}
  >
    <DialogTitle id={TITLE} className="Dialog-title">
      {open ? getTitle(media) : 'Preview Media'}
    </DialogTitle>
    <DialogContent className="Dialog-body PreviewMediaDialog-content">
      {open && (
        <PreviewPlayer
          mode="preview"
          media={media}
          volume={volume}
        />
      )}
    </DialogContent>
  </Dialog>
);

PreviewMediaDialog.propTypes = {
  open: PropTypes.bool,
  media: PropTypes.object,
  volume: PropTypes.number,

  onCloseDialog: PropTypes.func.isRequired,
};

export default PreviewMediaDialog;
