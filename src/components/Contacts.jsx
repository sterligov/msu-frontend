import React from 'react';

export default class Contacts extends React.Component {
    componentDidMount() {
        document.title = 'Контакты';
    }

    render() {
        return (
            <article className="section-main">
                <h2 className="event-title mb-2">Контакты</h2>
                <address>
                    <ul>
                        <li>+998 (71) 232-28-01 Приемная исполнительного директора</li>
                        <li>+998 (71) 233-58-26 Канцелярия и телефон доверия</li>
                        <li>+998 (71) 232-28-22 Факультет Прикладной математики и информатики</li>
                        <li>+998 (71) 232-28-11 Факультет Психологии</li>
                        <li>+998 (71) 233-87-88 Подготовительные курсы</li>
                        <li>+998 (71) 236-30-60 Главный бухгалтер</li>
                        <li>+998 (71) 232-07-33 Планово-финансовый отдел и маркетинг</li>
                        <li>+998 (71) 232-28-10 Отдел кадров</li>
                    </ul>
                </address>
                <hr/>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5994.76373603328!2d69.2775002!3d41.3005556!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x3920c131719425d0!2z0KTQuNC70LjQsNC7INCc0JPQoyDQuNC8LiDQm9C-0LzQvtC90L7RgdC-0LLQsA!5e0!3m2!1sru!2s!4v1464799401723"
                    width="100%"
                    height="400px"
                    className="google-map"
                    frameBorder="0"
                    title="google-map"
                    allowFullScreen/>
            </article>
        );
    }
}