/**
 * Add-ons actions.
 * @module actions/addons/addons
 */

import {
  LIST_ADDONS,
} from '../../constants/ActionTypes';


/**
 * List addons function
 * @function listAddons
 * @param {string} query Query
 * @returns {Object} List addons action
 */
export function listAddons() {
	console.log('in listAddons');
  return {
    type: LIST_ADDONS,
    promise: api => api.get('/@addons'),
  };
}