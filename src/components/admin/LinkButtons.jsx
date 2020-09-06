import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';

export default class LinkButtons extends React.Component {
    render() {
        const article = this.props.article;
        return (
            <>
                {Object.keys(article).length > 0 &&
                <>
                    {article.id &&
                    <div>
                        <button className="btn btn-info btn-sm mt-1 d-block">
                            <Link to="/admin/articles" className="without-a">Создать новую страницу</Link>
                        </button>

                        <CopyToClipboard text={`https://msu.uz/articles/${article.id}`}>
                            <button className="btn btn-info btn-sm mt-1 mr-2">
                                Скопировать ссылку
                            </button>
                        </CopyToClipboard>
                        <Link to={`/articles/${article.id}`}>https://msu.uz/articles/{article.id}</Link>
                    </div>
                    }
                    {article.slug &&
                    <div>
                        <CopyToClipboard text={`https://msu.uz/articles/${article.slug}`}>
                            <button className="btn btn-info btn-sm mt-1 mr-2">
                                Скопировать ссылку
                            </button>
                        </CopyToClipboard>
                        <Link to={`/articles/${article.slug}`}>https://msu.uz/articles/{article.slug}</Link>
                    </div>
                    }
                </>
                }
            </>
        );
    }
}