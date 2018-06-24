/**
 * Addons reducer.
 * @module reducers/addons/addons
 */

import { LIST_ADDONS } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  installedAddons: [],
  availableAddons: [],
  upgradableAddons: [],
  loaded: false,
  loading: false,
};


function addonsSorter(a, b){
  var titleA = a.title.toUpperCase();
  var titleB = b.title.toUpperCase();
  if (titleA < titleB){
    return -1;
  }
  else if (titleA > titleB){
    return 1;
  }
  return 0;
}

/**
 * Addons reducer.
 * @function addons
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function addons(state = initialState, action = {}) {
  switch (action.type) {
    case `${LIST_ADDONS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${LIST_ADDONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        installedAddons: action.result.items.filter(elem => {
            return elem.is_installed === true;
        }).sort(addonsSorter),
        availableAddons: action.result.items.filter(elem => {
            return elem.is_installed === false;
        }).sort(addonsSorter),
        upgradableAddons: action.result.items.filter(elem => {
            return elem.upgrade_info['available'] === true;
        }).sort(addonsSorter),
        loaded: true,
        loading: false,
      };
    case `${LIST_ADDONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        installedAddons: [],
        availableAddons: [],
        upgradableAddons: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
