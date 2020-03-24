// import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const FETCH_CURRENT_USERS = 'fetch_current_users';

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

export const fetchCurrentUser = () => async (dispatch, getState, axiosInstance) => {
    const res = await axiosInstance.get('/current_user');
    // console.log('current_user: ', res);
    dispatch({
        type: FETCH_CURRENT_USERS,
        payload: res
    });
};