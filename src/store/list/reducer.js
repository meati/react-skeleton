import reducer from '../../utils/reducer';
import { types } from './actions.js';
import { lists } from '@utils';

const initState = {
  tree: []
};

export default reducer(initState, {
  [types.UPDATE]: (state, action) => {
    return {
      ...state,
      tree: lists.patch(state.tree, action.payload)
    };
  },
  [types.GET_SUCCESS]: (state, action) => {
    return {
        ...state,
        tree: action.payload
    }
  }
});
