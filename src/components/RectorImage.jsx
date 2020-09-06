import React from 'react';

export default class RectorImage extends React.Component {
    render() {
        return (
            <div className="leadership-image">
                <div className="reson-pane text-center">
                    <div className="reson-pane-img">
                        <img alt="Ректор МГУ академик Виктор Антонович Садовничий" src="/images/rektor.png" />
                    </div>
                    <span className="reson-pane-post">Ректор МГУ академик</span> <span
                    className="reson-pane-name"><b>Виктор Антонович Садовничий</b></span> <br />
                </div>
                <div className="reson-pane text-center">
                    <div className="reson-pane-img">
                        <img alt="Руководитель Филиала Кудрявцев Валерий Борисович" src="/images/kudr.jpg" />
                    </div>
                    <span className="reson-pane-post">Руководитель филиала МГУ в Ташкенте</span> <span
                    className="reson-pane-name"><b>Валерий Борисович Кудрявцев</b></span> <br />
                </div>
            </div>
        );
    }
}