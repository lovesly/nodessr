import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
// why curry here?
export const fetchUsers = () => async (dispatch) => {
    // xss attack example
    // const res = await axios.get('https://react-ssr-api.herokuapp.com/users/xss');
    const res = await axios.get('https://react-ssr-api.herokuapp.com/users');
    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};