import React from 'react';
import {withRouter} from 'react-router-dom';

class MenuActive extends React.Component {

    componentDidMount() {
        this.activation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.location.pathname !== prevProps.location.pathname
        ) {
            const menuItem = document.querySelector(".menu-left-act");
            if (menuItem) {
                menuItem.classList.remove("menu-left-act");
            }

            this.activation();
        }
    }

    activation() {
        const menuItem = document.querySelector(`.menu-left a[href="${this.props.location.pathname}"]`);
        if (menuItem) {
            menuItem.classList.add("menu-left-act");
        }
    }

    render() {
        return null;
    }
}

export default withRouter(MenuActive);