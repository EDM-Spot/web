import { createSelector, createStructuredSelector } from 'reselect';
import naturalCmp from 'natural-compare';
import values from 'object-values';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

const baseSelector = state => state.playlists;

export const playlistItemsSelector = createSelector(
  baseSelector,
  playlists => playlists.playlistItems
);

export const activePlaylistIDSelector = createSelector(
  baseSelector,
  playlists => playlists.activePlaylistID
);

const activeMediaSelector = createSelector(
  playlistItemsSelector,
  activePlaylistIDSelector,
  (playlistItems, activePlaylist) => playlistItems[activePlaylist] || []
);

function mergePlaylistItems(playlist, playlistItems) {
  if (playlist) {
    return {
      ...playlist,
      media: playlistItems
    };
  }
  return null;
}

export const activePlaylistSelector = createSelector(
  baseSelector,
  activePlaylistIDSelector,
  activeMediaSelector,
  (playlists, activeID, activeMedia) =>
    mergePlaylistItems(playlists.playlists[activeID], activeMedia)
);

export const selectedPlaylistIDSelector = createSelector(
  baseSelector,
  playlists => playlists.selectedPlaylistID
);

const selectedMediaSelector = createSelector(
  playlistItemsSelector,
  selectedPlaylistIDSelector,
  (playlistItems, selectedPlaylist) => playlistItems[selectedPlaylist] || []
);

export const selectedPlaylistSelector = createSelector(
  baseSelector,
  selectedPlaylistIDSelector,
  selectedMediaSelector,
  (playlists, selectedID, selectedMedia) =>
    mergePlaylistItems(playlists.playlists[selectedID], selectedMedia)
);

export const playlistsSelector = createSelector(
  baseSelector,
  selectedPlaylistIDSelector,
  (playlists, selectedID) => values(playlists.playlists)
    .sort(byName)
    .map(playlist => ({
      ...playlist,
      selected: playlist._id === selectedID
    }))
);

export const nextMediaSelector = createSelector(
  activeMediaSelector,
  media => media ? media[0] : null
);

export const playlistsIndexSelector = createStructuredSelector({
  playlists: playlistsSelector,
  activePlaylist: activePlaylistSelector,
  selectedPlaylist: selectedPlaylistSelector,
  activeMedia: activeMediaSelector,
  selectedMedia: selectedMediaSelector
});
