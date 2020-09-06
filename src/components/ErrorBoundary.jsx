import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }


    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div className="d-flex justify-content-center mt-5">
                        <h1 className="text-white">Кажется что-то пошло не так. Мы уже работаем над исправлением данной
                            проблемы. Попробуйте зайти позже.</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src="/images/logonew.png" alt="Логотип МГУ"/>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}