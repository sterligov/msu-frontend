import React from "react";
import {post} from "axios";
import {withRouter} from "react-router-dom";
import ArticleForm from "./ArticleForm";

class ArticleFormPost extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.setPreviewImage = this.setPreviewImage.bind(this);
    }

    fetchData(article, previewImage = '') {
        return post(`/articles`, article)
            .then(
                res => {
                    if (previewImage) {
                        this.setPreviewImage(res.data, previewImage);
                    } else {
                        this.props.history.push(`/admin/articles/${res.data.id}`)
                    }
                },
                err => {
                    throw err;
                }
            )
    }

    setPreviewImage(article, previewImage) {
        const image = {
            article: article["@id"],
            mediaObject: previewImage
        };

        post('/preview_images', image)
            .then(
                () => this.props.history.push(`/admin/articles/${article.id}`),
                () => {
                    alert("Ошибка! Превью изображение не было установлено.");
                    this.props.history.push(`/admin/articles/${article.id}`);
                }
            );
    }

    render() {
        return <ArticleForm fetchData={this.fetchData}/>
    }
}

export default withRouter(ArticleFormPost);