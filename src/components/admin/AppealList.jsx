import React from "react";
import {Link, withRouter} from "react-router-dom";
import axios, {get} from "axios";
import format from 'date-format';
import ListPlaceholder from "../ListPlaceholder";
import Pagination from "../Pagination";
import Error from "../Error";
import Appeal from "./Appeal";

class AppealList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            page: 1,
            totalItems: 0
        };
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    handlePaginationClick(e) {
        const page = +e.target.dataset.pagination;
        this.setState({page: page});

        this.cancelSource.cancel();
        this.cancelSource = axios.CancelToken.source();

        get(`appeals?page=${page}&partition=true`)
            .then(
                result => {
                    this.setState({
                        items: result.data["hydra:member"],
                    });
                },
                err => {
                    this.setState({
                        items: [],
                        error: err
                    });
                }
            );
    }

    componentDidMount() {
        this.cancelSource = axios.CancelToken.source();
        this._isMounted = true;

        get("appeals?page=1", {cancelToken: this.cancelSource.token})
            .then(
                result => {
                    if (this._isMounted) {
                        this.setState({
                            items: result.data["hydra:member"],
                            totalItems: result.data["hydra:totalItems"]
                        });
                    }
                },
                err => {
                    if (this._isMounted) {
                        this.setState({
                            items: [],
                            error: err
                        });
                    }
                }
            );
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.cancelSource.cancel();
    }

    render() {
        if (this.state.error) {
            return <Error err={this.state.error}/>
        }

        return (
            <div className="section-main">
                <h1 className="event-title">Обращения в электронную приемную</h1>

                {this.state.items.length === 0 &&
                <ListPlaceholder number={3}/>
                }

                {this.state.items.map(item =>
                    <div className="row mb-3" key={`appeal_${item.id}`}>
                        <Link to={`/appeals/${item.id}`} target="_blank" rel="noopener noreferrer">
                            {format('yyyy/MM/dd', new Date(item.createdAt))} {item.fullName}
                        </Link>
                    </div>
                )}

                {this.state.totalItems > 0 &&
                <Pagination
                    totalItems={this.state.totalItems}
                    selected={this.state.page}
                    handlePaginationClick={this.handlePaginationClick}
                />
                }
            </div>
        );
    }
}

export default withRouter(AppealList);

