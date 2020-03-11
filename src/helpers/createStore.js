import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

// two seprate store? confused
// 很奇怪，reducers 也是用的同一个，啥意思呢
export default () => {
    const store = createStore(reducers, {}, applyMiddleware(thunk));
    return store;
};