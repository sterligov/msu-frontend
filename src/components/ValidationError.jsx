import React from 'react';

export default class ValidationError extends React.Component {
    render() {
        return (
            <div className="text-danger mb-3 mt-1">
                {this.props.error}
            </div>
        );
    }
}