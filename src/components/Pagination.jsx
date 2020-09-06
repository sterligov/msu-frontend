import React from 'react';

export default class Pagination extends React.Component {
    getPaginationArray() {
        let nPage = Math.ceil(this.props.totalItems / 10);

        let pagination = [this.props.selected];

        if (this.props.selected + 1 <= nPage) {
            pagination.push(this.props.selected + 1);

            if (this.props.selected + 1 !== nPage) {
                pagination.push("...");
                pagination.push(nPage);
            }
        }

        if (this.props.selected - 1 >= 1) {
            pagination.unshift(this.props.selected - 1);
            if (this.props.selected - 1 !== 1) {
                pagination.unshift("...");
                pagination.unshift(1);
            }
        }

        return pagination;
    }

    renderListItem(val, index) {
        if (val === "...") {
            return <li key={index}>...</li>
        } else if (val === this.props.selected) {
            return <li key={index} className="pagination-act">{val}</li>;
        } else {
            return <li key={index} data-pagination={val} onClick={this.props.handlePaginationClick}>{val}</li>;
        }
    }

    render() {
        if (!this.props.totalItems) {
            return <></>
        }

        const pagination = this.getPaginationArray();

        return (
            <ul className="pagination">
                {pagination.map((val, index) =>
                    this.renderListItem(val, index)
                )}
            </ul>
        );
    }
}