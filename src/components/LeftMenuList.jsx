import React from "react";

import {Link} from "react-router-dom";

export default class LeftMenuList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.target.parentElement.classList.toggle("active");
    }

    render() {
        return (
            <>
                <li><Link to="/">Главная страница</Link></li>
                <li><Link to="/leadership">Руководство</Link></li>
                <li><Link to="/mathfaculty">Факультет ПМиИ</Link></li>
                <li><Link to="/psyfaculty">Факультет Психологии</Link></li>
                <li className="sub-menu">
                    <div className="sub-menu-header pointer" onClick={this.handleClick}>Образование</div>
                    <ul className="sub-menu-list">
                        <li><Link to="/articles/361">Сведения об образовательной организации</Link></li>
                        <li><Link to="/edplans">Учебные планы</Link></li>
                        <li><Link to="/articles/363">Образовательные стандарты</Link></li>
                        <li><Link to="/articles/397">Локальные нормативные акты</Link></li>
                        <li className="sub-menu">
                            <div className="sub-menu-header pointer" onClick={this.handleClick}>Образовательные программы</div>
                            <ul className="sub-menu-list">
                                <li><Link to="/articles/368">Бакалавриат - ОП "ПМиИ"</Link></li>
                                <li><Link to="/articles/398">Магистратура - ОП "ПМиИ"</Link></li>
                                <li><Link to="/articles/369">Бакалавриат - ОП "Психология"</Link></li>
                                <li><Link to="/articles/385">Магистратура - ОП "Психология"</Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="sub-menu">
                    <div className="sub-menu-header pointer" onClick={this.handleClick}>Информация для поступающих</div>
                    <ul className="sub-menu-list">
                        <li><Link to="/enrollee">Бакалавриат</Link></li>
                        <li><Link to="/enrollee-master">Магистратура</Link></li>
                        <li><Link to="/exercises">Варианты экзаменов прошлых лет</Link></li>
                    </ul>
                </li>
                <li><Link to="/courses">Подготовительные курсы</Link></li>
                <li><Link to="/school">Работа со школьниками</Link></li>
                <li><Link to="/struct">Цели филиала</Link></li>
                <li><Link to="/schedule">Расписание занятий</Link></li>
                <li><Link to="/educational">Учебный отдел</Link></li>
                <li><Link to="/science">Научная деятельность</Link></li>
                <li><Link to="/edplans">Учебные планы</Link></li>
                <li><Link to="/resources">Информационные ресурсы</Link></li>
                <li><Link to="/union">Союз молодежи Узбекистана</Link></li>
                <li><Link to="/financial-activity">Финансовая деятельность</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
            </>
        );
    }
}