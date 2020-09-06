import React from "react";
import TopMenuList from "../TopMenuList";
import LeftMenuList from "../LeftMenuList";
import Logo from "../Logo";

export default class MobileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    }

    // TODO: user redux instead
    handleMenuButtonClick(e) {
        if (!e.target.classList.contains("sub-menu-header")) {
            let element = document.querySelector(".wrap-mobile-menu-scroll");
            element.classList.toggle("open-mobile-menu");

            element = document.querySelector("body");
            element.classList.toggle("overflow-hidden");

            element = document.querySelector(".wrap");
            element.classList.toggle("opacity-50");
        }
    }

    render() {
        return (
            <div className="mobile-header">
                <div className="wrap-mobile-menu-btn">
                    <div className="mobile-menu-btn pointer" onClick={this.handleMenuButtonClick}>
                        <img src="/images/menu-mobile-btn_320.png" alt="Кнопка открыть-закрыть"/>
                    </div>
                </div>
                <Logo/>
                <div className="wrap-mobile-menu-scroll">
                    <div id="mobile-menu-scroll" className="mobile-menu-scroll">
                        <div className="mobile-menu-scroll-content">
                            <div className="mobile-menu-close-btn-pane">
                                <div className="mobile-menu-close-btn pointer"
                                     onClick={this.handleMenuButtonClick}>Закрыть
                                </div>
                            </div>
                            <ul className="mobile-menu" onClick={this.handleMenuButtonClick}>
                                <LeftMenuList/>
                            </ul>
                            <ul className="mobile-menu" onClick={this.handleMenuButtonClick}>
                                <TopMenuList />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}