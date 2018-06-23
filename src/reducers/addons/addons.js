/**
 * Addons reducer.
 * @module reducers/addons/addons
 */

import { LIST_ADDONS } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  addons: [],
  loaded: false,
  loading: false,
};

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
        addons: action.result,
        loaded: true,
        loading: false,
      };
    case `${LIST_ADDONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        addons: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
