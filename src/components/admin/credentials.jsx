import React from "react";
import {authService} from "../../authService";
import {Redirect} from "react-router-dom";

export {
    withAdminCheck,
    withAuthenticatedCheck
}

function withAuthenticatedCheck(Component) {
    return check(Component, authService.role.user);
}

function withAdminCheck(Component) {
    return check(Component, authService.role.admin);
}

function check(Component, userRole) {
    return class extends React.Component {
        render() {
            if (!authService.isGranted(userRole)) {
                return <Redirect to="/login"/>
            }

            return Component;
        }
    }
}