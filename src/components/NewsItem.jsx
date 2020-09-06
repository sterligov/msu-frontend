import React from 'react';
import {Link} from 'react-router-dom';
import format from 'date-format';

export default class NewsItem extends React.Component {
    render() {
        const news = this.props.news;

        return (
            <>
                <div className="news-list-item">
                    <div className="news-list-tag-pane news-list-tag-dateonly">
                        <div className="news-list-item-date">
                            {format("MM/dd", new Date(news.publishedAt))}
                        </div>
                    </div>

                    <div className="news-list-item-head">
                        <Link to={`/articles/${news.slug}`}><b>{news.title}</b></Link>
                    </div>

                    {news.previewImage &&
                    <div className="news-list-item-img">
                        <a href={news.previewImage.mediaObject.contentUrl}>
                            <div style={{width: "114px"}}>
                                <img src={news.previewImage.mediaObject.contentUrl} width="100%" alt={this.props.news.title}/>
                            </div>
                        </a>
                    </div>
                    }

                    <div className="news-list-item-text">
                        {this.props.news.previewText}
                    </div>
                </div>
            </>
        );
    }
}