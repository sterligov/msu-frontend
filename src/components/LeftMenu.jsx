import React from 'react';

import { Link } from "react-router-dom";

export default class LeftMenu extends React.Component {
    render() {
        return (
            <nav>
                <ul className="menu-left">
                    <li><Link to="/">Главная страница</Link></li>
                    <li><Link to="/leadership">Руководство</Link></li>
                    <li><Link to="/mathfaculty">Факультет ПМиИ</Link></li>
                    <li><Link to="/psyfaculty">Факультет Психологии</Link></li>
                    <li><Link to="/education">Образование</Link></li>
                    <li><Link to="/enrollee">Информация для поступающих</Link></li>
                    <li><Link to="/courses">Подготовительные курсы</Link></li>
                    <li><Link to="/school">Работа со школьниками</Link></li>
                    <li><Link to="/struct">Цели филиала</Link></li>
                    <li><Link to="/schedule">Расписание занятий</Link></li>
                    <li><Link to="/educational">Учебный отдел</Link></li>
                    <li><Link to="/science">Научная деятельность</Link></li>
                    <li><Link to="/edplans">Учебные планы</Link></li>
                    <li><Link to="/resources">Информационные ресурсы</Link></li>
                    <li><Link to="/union">Союз молодежи Узбекистана</Link></li>
                    <li><Link to="/contacts">Контакты</Link></li>
                </ul>
            </nav>
        );
    }
}