import React from "react";
import {withRouter} from "react-router-dom";
import axios, {get} from "axios";
import ListPlaceholder from "./ListPlaceholder";
import Error from "./Error";
import ControlButtons from "./admin/ControlButtons";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            article: null
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this.props.match.params.route);
    }

    componentDidUpdate(prevProps, prevState, nextContext) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.cancelSource.cancel();
            this.setState({
                error: null,
                article: null
            });
            this.fetchData(this.props.match.params.route);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.cancelSource.cancel();
    }

    fetchData(route) {
        route = route || this.props.match.params.id;
        let url;

        if (!isNaN(parseFloat(route)) && isFinite(route)) {
            url = `articles/${route}`;
        } else {
            url = `articles/slug/${route}`;
        }

        this.cancelSource = axios.CancelToken.source();

        get(url, {cancelToken: this.cancelSource.token})
            .then(
                res => {
                    if (this._isMounted) {
                        let article = res.data;
                        document.title = article.title;

                        this.setState({
                            article: article,
                            error: null
                        });
                    }
                },
                err => {
                    if (this._isMounted) {
                        this.setState({
                            error: err.response,
                            article: null
                        });
                    }
                }
            );
    }

    render() {
        const {error, article} = this.state;

        if (error) {
            return <Error error={error}/>;
        } else if (article === null) {
            return (
                <div className="section-main">
                    <ListPlaceholder number={4}/>
                </div>
            );
        } else {
            return (
                <article className="section-main">
                    <h1 className="event-title">{article.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: article.text}}/>
                    <ControlButtons article={article}/>
                </article>
            );
        }
    }
}

export default withRouter(Article);