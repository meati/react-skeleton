import * as api from '../../api';
import { lists } from '@utils';

export const types = {
    UPDATE: Symbol('UPDATE'),
    GET_SUCCESS: Symbol('GET_SUCCESS')
};

export default {
    update: (item) => {
        return async dispatch => {
            try {
                let updatedItem = await api.list.update(item)
                dispatch({ type: types.UPDATE, payload: updatedItem });
                return updatedItem;
            } catch(err) {
                console.error(err);
            }
        };
    },
    get: () => {
        return async (dispatch) => {
            const tree = lists.list2tree(await api.list.get())
            dispatch({ type: types.GET_SUCCESS, payload: tree });
            return tree;
        };
    }
};
