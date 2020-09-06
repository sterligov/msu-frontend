import React from 'react';
import {authService} from "../../authService";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default class ControlButtons extends React.Component {
    render() {
        return (
            <>
                {authService.isAdmin() &&
                <div className="mt-4">
                    <EditButton article={this.props.article}/>
                    <DeleteButton article={this.props.article}/>
                </div>
                }
            </>
        )
    }
}
