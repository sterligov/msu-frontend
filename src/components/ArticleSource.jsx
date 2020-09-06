import React from "react";
import axios, {get} from "axios";
import format from "date-format";
import {withRouter} from "react-router-dom";

let properties = ["id", "previewText", "title", "slug", "publishedAt", "previewImage"];
properties = "properties[]=" + properties.join("&properties[]=");

export function withArticleListSource(Component) {
    const ArticleSourceList = class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                page: this.getParam("page", 1),
                articles: [],
                totalItems: 0,
                error: null
            };
        }

        getParam(paramName, defaultValue) {
            let paramValue = this.props[paramName] || defaultValue;
            if (this.props.match) {
                paramValue = this.props.match.params[paramName] || paramValue;
            }
            return paramValue;
        }

        componentDidMount() {
            this._isMounted = true;
            this.getArticles(this.state.page);
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            const page = this.getParam("page");
            if (page && this.state.page !== page) {
                this.setState({page: page, articles: []});
                this.getArticles(page);
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
            this.cancelSource.cancel();
        }

        getArticles(page) {
            const limit = this.props.limit || 10;
            const partial = this.props.partial || "true";
            const tag = this.getParam("tag");

            if (this.cancelSource) {
                this.cancelSource.cancel();
            }

            this.cancelSource = axios.CancelToken.source();

            get(`/tags/${tag}/articles?page=${page}&${properties}&partial=${partial}`, {
                cancelToken: this.cancelSource.token
            })
                .then(
                    result => {
                        if (this._isMounted) {
                            this.setState({
                                articles: result.data["hydra:member"].slice(0, limit),
                                totalItems: result.data["hydra:totalItems"] || 0,
                                error: null
                            });
                        }
                    },
                    err => {
                        if (this._isMounted) {
                            this.setState({
                                articles: [],
                                error: err
                            });
                        }
                    }
                );
        }

        render() {
            return <Component
                tag={this.getParam('tag')}
                page={this.state.page}
                history={this.props.history}
                articles={this.state.articles}
                totalItems={this.state.totalItems}
                error={this.state.error}/>
        }
    }

    return withRouter(ArticleSourceList);
}

export function withArticleSource(Component) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                article: {},
                error: null
            };

            this.getLastArticle = this.getLastArticle.bind(this);
            this.getNextArticle = this.getNextArticle.bind(this);
            this.getPrevArticle = this.getPrevArticle.bind(this);
        }

        getLastArticle() {
            this.cancelSource = axios.CancelToken.source();

            get(`/tags/${this.props.tag}/articles?&page=1&${properties}&partial=true`, {
                cancelToken: this.cancelSource.token
            })
                .then(
                    result => {
                        if (this._isMounted) {
                            this.setState({
                                article: result.data["hydra:member"].length > 0 ? result.data["hydra:member"][0] : {}
                            });
                        }
                    },
                    err => {
                        if (this._isMounted) {
                            this.setState({
                                article: {},
                                error: err
                            });
                        }
                    }
                );
        }

        getNextArticle() {
            this.getArticleByDirection("strictly_after");
        }

        getPrevArticle() {
            this.getArticleByDirection("strictly_before");
        }

        getArticleByDirection(direction) {
            if (!this.state.article.publishedAt) {
                return;
            }

            const date = format("yyyy-MM-dd", new Date(this.state.article.publishedAt));

            if (this.cancelSource) {
                this.cancelSource.cancel();
            }
            this.cancelSource = axios.CancelToken.source();

            get(`/tags/${this.props.tag}/articles?${properties}&publishedAt[${direction}]=${date}&partial=true`, {
                cancelToken: this.cancelSource.token
            })
                .then(
                    result => {
                        if (this._isMounted && result.data["hydra:member"].length > 0) {
                            let index = direction === "strictly_before" ? 0 : result.data["hydra:member"].length - 1;
                            this.setState({
                                article: result.data["hydra:member"][index],
                                error: null
                            });
                        }
                    },
                    err => {
                        if (this._isMounted) {
                            this.setState({
                                article: {},
                                error: err
                            });
                        }
                    }
                );
        }

        componentDidMount() {
            this._isMounted = true;
            this.getLastArticle();
        }

        componentWillUnmount() {
            this._isMounted = false;
            this.cancelSource.cancel();
        }

        render() {
            return <Component
                article={this.state.article}
                error={this.state.error}
                getNextArticle={this.getNextArticle}
                getPrevArticle={this.getPrevArticle}/>
        }
    }
}