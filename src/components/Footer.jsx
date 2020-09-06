import React from 'react';

export default class Footer extends React.Component {
    render() {
        const year = (new Date()).getFullYear();
        return (
            <footer className="footer">
                <ul className="nav-footer">
                    <li><a href="http://www.msu.ru/" target="_blank" rel="noopener noreferrer"><img
                        src="/images/link-msu.gif" alt="Иконка МГУ"/></a></li>
                    <li><a href="http://www.math.msu.ru/" target="_blank" rel="noopener noreferrer"><img
                        src="/images/link-mex-mat.jpg" alt="Иконка мехмат"/></a></li>
                    <li><a href="http://www.intsys.msu.ru/" target="_blank" rel="noopener noreferrer"><img
                        src="/images/link-matis.jpg" alt="Иконка МАТиС"/></a></li>
                    <li><a href="http://www.psy.msu.ru/" target="_blank" rel="noopener noreferrer"><img
                        src="/images/link-psy.jpg" alt="Иконка Психологи"/></a></li>
                </ul>
                <div className="copyright">
                    Copyright © 2006–{year} Филиал МГУ имени М.В.Ломоносова<br/>
                    При перепечатке текстовой информации и фотографий ссылка на сайт обязательна<br/>
                </div>
                <div id="bx-composite-banner"/>
                <div id="yandex-metrika">
                    <a href="https://metrika.yandex.ru/stat/?id=39906540&amp;from=informer" target="_blank"
                       rel="noopener noreferrer">
                        <img
                            src="https://informer.yandex.ru/informer/39906540/3_0_FFFFFFFF_EFEFEFFF_0_pageviews"
                            style={{width: "88px", height: "31px", border: "0"}} alt="Яндекс.Метрика"
                            title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
                            className="ym-advanced-informer" data-cid="39906540"
                            data-lang="ru"/>
                    </a>
                </div>
            </footer>
        );
    }
}