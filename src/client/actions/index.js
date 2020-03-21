// import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
// why curry here?
// passin axiosInstance with extraArguments...
// wow
export const fetchUsers = () => async (dispatch, getState, axiosInstance) => {
    // xss attack example
    // const res = await axios.get('https://react-ssr-api.herokuapp.com/users/xss');
    const res = await axiosInstance.get('/users');
    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};