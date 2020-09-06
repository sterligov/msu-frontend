import React from 'react';
import TopMenu from './TopMenu';
import TopMenuPoorVision from "./TopMenuPoorVision";

export class Header extends React.Component {
    render() {
        return localStorage.getItem("poor_vision") ? <TopMenuPoorVision /> : <TopMenu />;
    }
}