import React from "react";
import {Link} from 'react-router-dom';
import format from 'date-format';
import ListPlaceholder from "./ListPlaceholder";
import Pagination from './Pagination';
import Error from "./Error";
import ControlButtons from "./admin/ControlButtons";
import {withArticleListSource} from "./ArticleSource";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    handlePaginationClick(e) {
        const page = +e.target.dataset.pagination;
        this.props.history.push(`/tags/${this.props.tag}/${page}`);
    }

    render() {
        if (this.props.error) {
            return <Error err={this.props.error}/>
        }

        return (
            <div className="section-main">
                <h1 className="event-title">{this.props.tag}</h1>

                {this.props.articles.length === 0 &&
                <ListPlaceholder number={3}/>
                }

                {this.props.articles.map(item =>
                    <div className="news-list-item mb-2" key={item.id}>
                        <div className="news-list-tag-pane news-list-tag-dateonly" style={{width: "100px", margin: 0}}>
                            <div className="news-list-item-date">
                                {format('yyyy/MM/dd', new Date(item.publishedAt))}
                            </div>
                        </div>

                        <div className="news-list-item-head ml-5">
                            <Link to={`/articles/${item.slug}`} className="font-weight-bold">
                                {item.title}
                            </Link>
                        </div>

                        <div className="news-list-item-img">
                            {item.previewImage &&
                            <div style={{"width": "114px"}}>
                                <img src={item.previewImage.mediaObject.contentUrl} alt={item.title} className="w-100"/>
                            </div>
                            }
                        </div>

                        <div className="news-list-item-text mb-2">
                            {item.previewText}
                        </div>
                        <ControlButtons article={item}/>
                    </div>
                )}

                {this.props.totalItems > 0 &&
                <Pagination
                    totalItems={+this.props.totalItems}
                    selected={+this.props.page}
                    handlePaginationClick={this.handlePaginationClick}/>
                }
            </div>
        );
    }
}

export default withArticleListSource(ArticleList);

