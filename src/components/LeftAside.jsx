import React from 'react';
import RectorImage from "./RectorImage";
import Logo from "./Logo";
import LeftMenuList from "./LeftMenuList";
import Calendar from "./Calendar";

export default class LeftAside extends React.Component {
    render() {
        return (
            <aside className="aside-left">
                {!localStorage.getItem("poor_vision") &&
                <Logo/>
                }
                <nav>
                    <ul className="menu-left">
                        <LeftMenuList/>
                    </ul>
                </nav>
                <RectorImage/>
                {localStorage.getItem("poor_vision") &&
                <Calendar tag="Календарь"/>
                }
            </aside>
        );
    }
}