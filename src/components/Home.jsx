import React from "react";
import {CarouselWrapper} from "./CarouselWrapper";
import News from "./News";
import RightAside from "./RightAside";
import {isMobile} from "react-device-detect";

export default class Home extends React.Component {
    componentDidMount() {
        document.title = "Филиал Московского Государственного Университета имени М.В.Ломоносова в городе Ташкенте";
    }

    render() {
        if (localStorage.getItem("poor_vision")) {
            return (
                <>
                    <News tag="Новости" limit={7}/>
                    <RightAside/>
                </>
            );
        } else if (isMobile) {
            return (
                <>
                    <CarouselWrapper/>
                    <News tag="Новости" limit={7}/>
                    <RightAside/>
                </>
            );
        } else {
            return (
                <>
                    <CarouselWrapper/>
                    <RightAside/>
                    <News tag="Новости" limit={7}/>
                </>
            );
        }
    }
}