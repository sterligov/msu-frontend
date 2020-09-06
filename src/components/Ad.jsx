import React from 'react';
import {Link} from "react-router-dom";
import format from "date-format";
import ListPlaceholder from "./ListPlaceholder";
import {withArticleListSource} from "./ArticleSource";

class Ad extends React.Component {
    render() {
        return (
            <section className="activity-pane">
                <h2>Объявления</h2>
                {this.props.articles.length === 0 &&
                    <ListPlaceholder number={5}/>
                }
                <ul>
                    {this.props.articles.map(item =>
                        <li key={item.slug}>
                            <div className="activity-pane-date">
                                {format('yyyy/MM/dd', new Date(item.publishedAt))}
                            </div>
                            <div className="activity-pane-head">
                                <Link to={`/articles/${item.slug}`}>{item.title}</Link>
                            </div>
                            <div className="activity-pane-text">
                                <p>{item.previewText}</p>
                            </div>
                        </li>
                    )}
                </ul>
                <Link to="/tags/Объявления/1" className="activity-pane-more">Все объявления</Link>
            </section>
        );
    }
}

export default withArticleListSource(Ad);