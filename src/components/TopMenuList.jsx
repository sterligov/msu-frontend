import React from 'react';
import {Link} from "react-router-dom";

export default class TopMenuList extends React.Component {
    render() {
        return (
            <>
                <li><Link to="/faq">Часто задаваемые вопросы</Link></li>
                <li><Link to="/reception-schedule">График приема</Link></li>
                <li className="nav-item-parent">
                    <div className="nav-item-header-name">Интерактивные службы</div>
                    <ul className="nav-level-1">
                        <li><Link to="/schedule">Расписание занятий</Link></li>
                        <li><Link to="/edplans">Учебные планы</Link></li>
                        <li><Link to="/enrollee">Абитуриентам бакалавриата</Link></li>
                        <li><Link to="/enrollee-master">Абитуриентам магистратуры</Link></li>
                        <li><Link to="/science">Научная деятельность</Link></li>
                        <li><Link to="/reception">Электронная приемная</Link></li>
                        <li><Link to="/reception-library">Электронная приемная библиотеки</Link></li>
                        <li><Link to="/resources">Электронная библиотека</Link></li>
                        <li><Link to="/vacancies">Вакансии</Link></li>
                    </ul>
                </li>
                <li className="nav-item-parent"><div className="nav-item-header-name">Сайты МГУ</div>
                    <ul className="nav-level-1">
                        <li><a href="http://www.msu.ru">МГУ им. М.В.Ломоносова</a></li>
                        <li><a href="http://www.math.msu.ru">Механико-математический факультет</a></li>
                        <li><a href="http://www.intsys.msu.ru">Кафедра МаТИС</a></li>
                        <li><a href="http://www.psy.msu.ru">Факультет Психологии</a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item-parent"><div className="nav-item-header-name">Пресс-служба</div>
                    <ul className="nav-level-1">
                        <li><Link to="/interview">Интервью руководителя</Link></li>
                    </ul>
                </li>
            </>
        );
    }
}