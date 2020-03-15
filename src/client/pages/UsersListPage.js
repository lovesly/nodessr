import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

// refactor this to hooks??
class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // 问题是，如果从其他地方过来，也许 store 里没有 userData？
        // 但是不注释，相当于重复请求。。。
        this.props.fetchUsers();
    }

    // need to setup babel?
    renderUsers = () => {
        return this.props.users.map(user => (
            <li key={user.id}>
                {user.name}
            </li>
        ));
    };

    render() {
        return (
            <div>
                Here's a big list of users:
                <ul>{ this.renderUsers() }</ul>
            </div>
        );
    }
}

// map state to props, and what's the name of the other one?
// what about propTypes?
function mapStateToProps(state) {
    return {
        users: state.users
    }
}

// 手动 dispatch？
function loadData(store) {
    return store.dispatch(fetchUsers());
}

// pass in action creators??
export default {
    component: connect(mapStateToProps, { fetchUsers })(UsersList),
    loadData,
};