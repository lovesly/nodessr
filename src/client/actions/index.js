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
    // 如果我们要做自己的 auth 服务，那么这里就得调用我们的服务了。
    // 而且首次进来的 axiosInstance 是 服务端的，后面才是客户端的，所以是两个不同的请求
    const res = await axiosInstance.get('/current_user');
    // console.log('current_user: ', res);
    dispatch({
        type: FETCH_CURRENT_USERS,
        payload: res
    });
};