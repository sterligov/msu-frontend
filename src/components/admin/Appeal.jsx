import React from "react";
import {withRouter} from "react-router-dom";
import axios, {get} from "axios";
import Error from "../Error";
import Spinner from "../Spinner";
import format from "date-format";

class Appeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appeal: {},
            error: null
        };
    }

    componentDidMount() {
        this.cancelSource = axios.CancelToken.source();
        this._isMounted = true;

        get(`appeals/${this.props.match.params.id}`, {cancelToken: this.cancelSource.token})
            .then(
                res => {
                    if (this._isMounted) {
                        this.setState({appeal: res.data, error: null})
                    }
                },
                err => {
                    if (this._isMounted) {
                        this.setState({error: err})
                    }
                }
            );
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.cancelSource.cancel();
    }

    render() {
        const appeal = this.state.appeal;

        if (Object.keys(appeal).length === 0) {
            return <Spinner/>
        }

        return (
            <div className="section-main">
                <div className="row mb-2">
                    <span className="font-weight-bold mr-2">ФИО:</span> {appeal.fullName}
                </div>

                <div className="row mb-2">
                    <span className="font-weight-bold mr-2">Email:</span> {appeal.email}
                </div>

                <div className="row mb-2">
                    <span className="font-weight-bold mr-2">Телефон:</span> {appeal.phone}
                </div>

                <div className="row mb-2">
                    <span className="font-weight-bold mr-2">Год рождения:</span> {appeal.birthYear}
                </div>

                <div className="row mb-2">
                    <span className="font-weight-bold mr-2">Адрес:</span> {appeal.address}
                </div>

                <div className="row mb-2">
                    <span className="font-weight-bold mr-2">Лицо:</span> {appeal.personType}
                </div>

                <div className="row mb-2">
                    <span className="font-weight-bold mr-2">Организация:</span> {appeal.organization}
                </div>

                <div className="row mb-2">
                    <span
                        className="font-weight-bold mr-2">Дата обращения:</span> {format('yyyy/MM/dd', new Date(appeal.createdAt))}
                </div>

                <div className="font-weight-bold row">Сообщение:</div>
                <div className="row">
                    {appeal.message}
                </div>

                {appeal.mediaObject &&
                <div className="row mt-2">
                    <a href={appeal.mediaObject.contentUrl}
                       target="_blank"
                       rel="noopener noreferrer">
                        Прикрепленный файл
                    </a>
                </div>
                }
            </div>
        );
    }
}

export default withRouter(Appeal);