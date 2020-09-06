import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

class DeleteButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        if (window.confirm("Вы уверены, что хотите удалить эту страницу?")) {
            axios.delete(`/articles/${this.props.article.id}`)
                .then(
                    () => {
                        alert("Страница успешно удалена");
                        this.props.history.push("/");
                    },
                    () => {
                        alert("Ошибка! Не удалось удалить страницу.");
                    }
                )
        }
    }

    render() {
        return (
            <button className="btn btn-danger btn-sm ml-2" onClick={this.handleDelete}>
                Удалить страницу
            </button>
        );
    }
}

export default withRouter(DeleteButton);