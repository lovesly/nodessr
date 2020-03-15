import React from 'react';
// import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

// export default () => {
//     return (
//         <React.Fragment>
//             <Route exact path="/" component={Home} />
//             <Route path="/users" component={UsersList} />
//         </React.Fragment>
//     );
// };

// to use react-router-config??
// 个人感觉完全可以通过 babel 插件做吧？没有什么特别了不起的，虽然肯定比我了不起。。。
export default [{
    ...HomePage,
    path: '/',
    exact: true
}, {
    ...UsersListPage,
    path: '/users',
}];
