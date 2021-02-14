import { createSelector } from 'reselect';

export const configSelector = (state) => state.config;

export const requestOptionsSelector = createSelector(
  configSelector,
  (config) => {
    const options = {};
    if (config.apiUrl) {
      options.apiUrl = config.apiUrl;
    }
    return options;
  },
);

export const availableEmojiImagesSelector = createSelector(
  configSelector,
  (config) => config.emoji || {},
);

export const availableEmojiNamesSelector = createSelector(
  availableEmojiImagesSelector,
  (emoji) => Object.keys(emoji),
);

const reCaptchaSelector = createSelector(
  configSelector,
  (config) => config.recaptcha,
);

export const reCaptchaSiteKeySelector = createSelector(
  reCaptchaSelector,
  (rc) => (rc ? rc.key : false),
);

export const rolesSelector = createSelector(
  configSelector,
  (config) => config.roles,
);

/**
 * Simple memoization function that only supports single-argument, pure functions.
 *
 * @template Argument,ReturnType
 * @param {(arg: Argument) => ReturnType} fn
 * @return {(arg: Argument) => ReturnType}
 */
function memoizePermanently(fn) {
  const cache = new Map();
  return (argument) => {
    if (cache.has(argument)) {
      return cache.get(argument);
    }
    const value = fn(argument);
    cache.set(argument, value);
    return value;
  };
}

export const roleSelector = memoizePermanently((roleName) => createSelector(
  rolesSelector,
  (roles) => roles[roleName],
));

// TODO make this configurable.
export const roleColorsSelector = () => ({
  admin: '#f1c40f',
  manager: '#cc3333',
  moderator: '#9b40e7',
  producer: '#5740d0',
  special: '#33ccff',
  default: '',
});
