import { FETCH_USERS } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            // weird, if we just want to return action.payload.data, why do we use reducer??
            return action.payload.data;
        default:
            return state;
    }
};