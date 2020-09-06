import React from 'react';
import {Link} from "react-router-dom";
import Calendar from "./Calendar";
import Ad from "./Ad";
import Description from "./Description";
import Congratulation from "./Congratulation";

export default class RightAside extends React.Component {
    render() {
        return (
            <aside className="aside-right">
                <div className="contacts-block">
                    <Calendar tag="Календарь"/>
                    <div className="ref-pane">
                        <Link to="/contacts" className="btn site-btn btn-msu" id="desk">Контакты</Link>
                        <br/> <br/>
                        <Link to="/reception"
                              className="btn site-btn btn-msu"
                              id="desk">Электронная<br/> приемная</Link>
                    </div>
                    <div className="address-pane">
                        <span><Link to="/contacts">Адрес филиала МГУ имени М.В.Ломоносова на карте</Link></span>
                    </div>
                </div>
                <Ad tag="Объявления" limit={5}/>
                <Congratulation tag="Поздравления"/>
                <Description/>
            </aside>
        );
    }
}