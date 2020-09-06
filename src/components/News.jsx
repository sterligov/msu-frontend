import React from "react";
import {Link} from "react-router-dom";
import NewsItem from "./NewsItem";
import ListPlaceholder from './ListPlaceholder'
import {withArticleListSource} from "./ArticleSource";

export class News extends React.Component {
    render() {
        return (
            <section className="section-news">
                <h2 className="font-weight-bold">Новости</h2>
                <div className="news-list">
                </div>
                {this.props.articles.length === 0 &&
                    <ListPlaceholder number={5}/>
                }
                {this.props.articles.map(item => <NewsItem news={item} key={`news_${item.slug}`}/>)}
                <p>
                    <Link to="/tags/Новости/1"
                          className="news-list-more"
                          title="Все новости">
                        Все новости
                    </Link>
                </p>
            </section>
        );
    }
}

export default withArticleListSource(News);