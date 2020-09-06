import React from 'react';
import {get, post, put} from 'axios';
import {withRouter} from "react-router-dom";
import ArticleForm from "./ArticleForm";
import Spinner from "../Spinner";

class ArticleFormPut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {article: {}};
        this.fetchData = this.fetchData.bind(this);
        this.updatePreviewImage = this.updatePreviewImage.bind(this);
    }

    componentDidMount() {
        get(`articles/${this.props.match.params.id}`)
            .then(
                res => this.setState({
                    article: res.data,
                }),
                err => this.setState({error: err})
            );
    }

    fetchData(article, previewImage = '') {
        return put(`/articles/${this.props.match.params.id}`, article)
            .then(
                res => {
                    if (previewImage) {
                        this.updatePreviewImage(res.data, previewImage)
                    }
                }
            )
    }

    updatePreviewImage(article, previewImage) {
        if (!article.previewImage) {
            const image = {
                article: article["@id"],
                mediaObject: previewImage
            };

            post('/preview_images', image)
                .then(
                    () => {},
                    () => {
                        alert("Ошибка! Превью изображение не было установлено.");
                    }
                );
        } else {
            put(`/preview_images/${article.id}`, {mediaObject: previewImage})
                .catch(() => alert("Ошибка! Не удалось обновить превью изображение."));
        }
    }

    render() {
        if (Object.keys(this.state.article).length === 0) {
            return <Spinner/>;
        }

        return (
            <>
                <ArticleForm
                    article={this.state.article}
                    fetchData={this.fetchData}
                    error={this.state.error}
                />
            </>
        )
    }
}

export default withRouter(ArticleFormPut);