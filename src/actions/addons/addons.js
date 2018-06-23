/**
 * Add-ons actions.
 * @module actions/addons/addons
 */

import {
  GET_ADDON,
  INSTALL_ADDON,
  LIST_ADDONS,
  UNINSTALL_ADDON,
  UPGRADE_ADDON,
} from '../../constants/ActionTypes';

/**
 * Get addon function.
 * @function getAddon
 * @param {string} id addon id
 * @returns {Object} Get addon action
 */
export function getAddon(content) {
  return {
    type: GET_ADDON,
    promise: api => api.get('/@addons', { data: content }),
  };
}

/**
 * List addons function
 * @function listAddons
 * @param {string} query Query
 * @returns {Object} List addons action
 */
export function listAddons(query) {
  return {
    type: LIST_ADDONS,
    promise: query
      ? api => api.get(`/@addons?query=${query}`)
      : api => api.get('/@addons'),
  };
}