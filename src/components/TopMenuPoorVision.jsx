import React from 'react';
import {Link} from "react-router-dom";


export default class TopMenuPoorVision extends React.Component {
    normalVision() {
        localStorage.removeItem("poor_vision");
        window.location.reload();
    }

    changeFontSize(e) {
        const fontSizeClassName = e.target.dataset.fontSize;
        localStorage.setItem("font_size", fontSizeClassName);

        window.location.reload();
    }

    changeFontColor(e) {
        const colorSchemeClassName = e.target.dataset.colorScheme;
        localStorage.setItem("color_scheme", colorSchemeClassName);

        window.location.reload();
    }

    render() {
        return (
            <header>
                <div className="header-top-pane-wrap">
                    <div className="header-top-pane">
                        <div className="header-top-pane__home">
                            <div className="pointer" onClick={this.normalVision}>
                                Обычная версия сайта
                            </div>
                        </div>
                        <div className="header-top-pane__font-size">
                            Размер шрифта:
                            <div className="font-size__list">
                                <div className="pointer font-size__item font-size__item--item1"
                                    data-font-size="font-size__item--item1" onClick={this.changeFontSize}>А
                                </div>
                                <div className="pointer font-size__item font-size__item--item2 ml-2"
                                    data-font-size="color-scheme--font-size-middle" onClick={this.changeFontSize}>А
                                </div>
                                <div className="pointer font-size__item font-size__item--item3 ml-2"
                                    data-font-size="color-scheme--font-size-large" onClick={this.changeFontSize}>А
                                </div>
                            </div>
                        </div>
                        <div className="header-top-pane__color-scheme">
                            Цветовая схема:
                            <div className="color-scheme__list">
                                <div className="color-scheme__item color-scheme__item--black-on-white"
                                    data-color-scheme="color-scheme--black-on-white" onClick={this.changeFontColor}>А
                                </div>
                                <div className="color-scheme__item color-scheme__item--white-on-black"
                                    data-color-scheme="color-scheme--white-on-black" onClick={this.changeFontColor}>А
                                </div>
                                <div className="color-scheme__item color-scheme__item--white-on-blue"
                                    data-color-scheme="color-scheme--white-on-blue" onClick={this.changeFontColor}>А
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="logo mt-3 mb-3">
                    <a href="/">Филиал МГУ имени М.В.Ломоносова в городе Ташкенте</a>
                </div>

                <nav className="header-bottom">
                    <ul className="nav-header">
                        <li><Link to="/faq">Часто задаваемые вопросы</Link></li>
                        <li><Link to="/reception-schedule">График приема</Link></li>
                        <li><Link to="/services">Интерактивные службы</Link></li>
                        <li><Link to="/contacts">Контакты</Link></li>
                        <li><Link to="/interview">Пресс-служба</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}