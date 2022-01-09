import React, {Component} from 'react';
import {withRouter} from "react-router";

class RedirectHome extends Component {
    componentDidMount() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default withRouter(RedirectHome);