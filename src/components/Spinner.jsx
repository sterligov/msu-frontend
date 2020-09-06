import React from 'react';

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="d-flex mt-5">
                <div className="mx-auto spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}