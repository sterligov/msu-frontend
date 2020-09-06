import React from 'react';
import {Link} from 'react-router-dom';
import ListPlaceholder from "./ListPlaceholder";
import {withArticleSource} from "./ArticleSource";
import {CSSTransition, SwitchTransition} from "react-transition-group";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {transitionClassName: "fade-right"};
    }

    monthName() {
        if (!this.props.article.publishedAt) {
            return "";
        }

        let date = new Date(this.props.article.publishedAt);
        date = date.toLocaleString("ru-RU", {month: "long"}) + ' ' + date.getFullYear();

        return date.charAt(0).toUpperCase() + date.substr(1);
    }

    render() {
        const {article} = this.props;

        return (
            <div className="calendar">
                <div className="calendar-head">Календарь конференций</div>

                <div className="calendar-tab">
                    <ul id="calendar-tab-head" className="calendar-tab-head">
                        <li className="calendar-tab-head_act arrow-date arrow-date">
                            {this.monthName()}
                        </li>
                    </ul>

                    <div id="calendar-tab-content" className="calendar-tab-content">
                        <div className="calendar-tab-item calendar-tab-item_act">
                            <SwitchTransition mode="out-in">
                                <CSSTransition
                                    key={article.title ? article.title : "placeholder"}
                                    addEndListener={(node, done) => {
                                        node.addEventListener("transitionend", done, false);
                                    }}
                                    classNames={this.state.transitionClassName}>
                                    <div className="wrap-calendar-tab-event">
                                        <Link to={`/articles/${this.props.article.slug}`}
                                              className="calendar-tab-event-date arrow-title">
                                            {article.title}
                                        </Link>
                                        {Object.keys(article).length === 0 &&
                                        <ListPlaceholder number={1}/>
                                        }
                                        <p className="calendar-tab-event-text arrow-text">{this.props.article.previewText}</p>
                                    </div>
                                </CSSTransition>
                            </SwitchTransition>
                        </div>
                    </div>

                    <div className="pointer calendar-tab-next arrow"
                         onClick={() => {
                             this.props.getNextArticle();
                             this.setState({transitionClassName: "fade-right"})
                         }}/>
                    <div className="pointer calendar-tab-prev arrow"
                         onClick={() => {
                             this.props.getPrevArticle();
                             this.setState({transitionClassName: "fade-left"})
                         }}/>
                </div>

                <Link to="/tags/Календарь/1" className="btn btn-msu">Все конференции</Link>
            </div>
        );
    }
}

export default withArticleSource(Calendar);