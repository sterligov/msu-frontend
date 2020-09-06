import React from "react";
import {Link} from "react-router-dom";
import ListPlaceholder from "./ListPlaceholder";
import {withArticleSource} from "./ArticleSource";
import {CSSTransition, SwitchTransition} from "react-transition-group";

class Congratulation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {transitionClassName: "fade-right"};
    }

    render() {
        const {article} = this.props;

        return (
            <article className="thanks-pane">
                <h2>Поздравления</h2>

                {Object.keys(article).length === 0 &&
                <ListPlaceholder number={1}/>
                }

                {Object.keys(article).length > 0 &&
                <div className="wrap-thanks-list">
                    <div className="thanks-list">
                        <SwitchTransition mode="out-in">
                            <CSSTransition
                                key={article.title ? article.title : "placeholder"}
                                addEndListener={(node, done) => {
                                    node.addEventListener("transitionend", done, false);
                                }}
                                classNames={this.state.transitionClassName}
                            >
                                <div className="thanks-list_act">
                                    <div className="thanks-list-head" id="thanks-head">
                                        <Link to={`/articles/${article.slug}`}
                                              className="arrow-title">
                                            {article.title}
                                        </Link>
                                    </div>
                                    <div className="thanks-list-text arrow-text" id="thanks-text">
                                        {article.previewText}
                                    </div>
                                </div>
                            </CSSTransition>
                        </SwitchTransition>
                    </div>

                    <div className="pointer thanks-list-next arrow"
                         onClick={() => {
                             this.props.getNextArticle();
                             this.setState({transitionClassName: "fade-right"})
                         }}/>
                    <div className="pointer thanks-list-prev arrow"
                         onClick={() => {
                             this.props.getPrevArticle();
                             this.setState({transitionClassName: "fade-left"})
                         }}/>
                </div>
                }
            </article>
        );
    }
}

export default withArticleSource(Congratulation);