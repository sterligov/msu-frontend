import React from 'react';
import TopMenuList from "./TopMenuList";

export default class TopMenu extends React.Component {
    poorVersion() {
        localStorage.setItem("poor_vision", "true");
        window.location.reload();
    }

    render() {
        return (
            <header className="header">
                <div className="header-top">
                    <div className="header-special">
                        <div className="pointer" onClick={this.poorVersion}>
                            <span className="ico-special" />
                            Версия для слабовидящих
                        </div>
                    </div>
                </div>
                <nav className="header-bottom">
                    <ul className="nav">
                        <TopMenuList />
                    </ul>
                </nav>
            </header>
        );
    }
}