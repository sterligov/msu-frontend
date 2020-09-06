import React from 'react';
import {Link} from "react-router-dom";

export default class Logo extends React.Component {
    render() {
        return (
            <div className="logo">
                <Link to="/">
                    <img src="/images/logonew.png" alt="Лого МГУ" />
                    <div className="mt-4 logo-text">
                        Филиал МГУ имени М.В.Ломоносова в городе Ташкенте
                    </div>
                </Link>
                <span>Основан в 2006 году</span>
            </div>
        );
    }
}