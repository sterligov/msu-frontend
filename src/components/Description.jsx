import React from 'react';

export default class Description extends React.Component {
    render() {
        return (
            <article className="news-important description-block">
                <div className="news-important-img">
                    <img src="/images/build.png" alt="Филиал МГУ" />
                        <div className="news-important-header">
                            <span style={{fontSize: "16px"}} title="Филиал МГУ">Филиал МГУв городе Ташкенте</span>
                        </div>
                </div>
                <div className="news-important-header news-important-header_mobile">
                    <span title="Филиал МГУ">Филиал МГУ в городе Ташкенте<br/></span>
                </div>
                <div className="news-important-text">
                    Ташкентский филиал МГУ создан в 2006 году, это учебное заведение сегодня является ведущим центром
                    подготовки специалистов в области математики, информатики и психологии для нужд Узбекистана.<br/><br/>
                    Образовательный процесс организован в соответствии с принятыми в Московском государственном
                    университете стандартами, а это обеспечивает подготовку высококвалифицированных специалистов.
                </div>
                <br/>
            </article>
        );
    }
}