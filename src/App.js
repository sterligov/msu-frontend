import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import {Header} from "./components/Header";
import LeftAside from "./components/LeftAside";
import RouterContainer from "./components/RouterContainer";
import Footer from "./components/Footer";
import MobileHeader from "./components/mobile/MobileHeader";

export default class App extends React.Component {
    getVisionClass() {
        if (localStorage.getItem("poor_vision")) {
            let className = [];

            if (localStorage.getItem("font_size")) {
                className.push(localStorage.getItem("font_size"));
            }

            if (localStorage.getItem("color_scheme")) {
                className.push(localStorage.getItem("color_scheme"));
            }

            return className.join(" ");
        }

        return "";
    }

    render() {
        return (
            <div className={this.getVisionClass()}>
                <MobileHeader/>
                <div className="wrap">
                    <Header/>
                    <LeftAside/>
                    <RouterContainer/>
                    <Footer/>
                </div>
            </div>
        );
    }
}
