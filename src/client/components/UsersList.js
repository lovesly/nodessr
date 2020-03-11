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

    }

    // need to setup babel?
    renderUsers = () => {
        return this.props.users.map(user => (
            <li key={user.id}>
                user.name
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

// pass in action creators??
export default connect(mapStateToProps, { fetchUsers })(UsersList);