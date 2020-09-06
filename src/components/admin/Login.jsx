import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import ValidationError from "../ValidationError";
import {authService} from "../../authService";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successfulLogin: false,
            isFormDisabled: false,
            error: null,
            user: {
                username: "",
                password: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let user = {...this.state.user};
        const inputName = e.target.getAttribute("name");
        user[inputName] = e.target.value;
        this.setState({user: user, error: null});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            isFormDisabled: true,
            error: null,
            successfulLogin: true
        });

        authService.login(this.state.user.username, this.state.user.password)
            .then(
                () => {
                    this.setState({isFormDisabled: false});
                },
                err => {
                    this.setState({isFormDisabled: false, error: err});
                }
            )
    }

    render() {
        if (authService.isLogged()) {
            return authService.isAdmin() ?
                <Redirect to="/admin/articles"/> : <Redirect to="/"/>;
        }

        const user = this.state.user;

        return (
            <div className="section-main">
                <h2>Авторизация</h2>
                <fieldset disabled={this.state.isFormDisabled}>
                    <form id="login" className="form-group w-25">
                        <label htmlFor="username">Имя пользователя</label>
                        <input type="text"
                               className="form-control"
                               name="username"
                               value={user.username}
                               onChange={this.handleChange}/>

                        <label htmlFor="username" className="mt-2">Пароль</label>
                        <input type="password"
                               className="form-control"
                               name="password"
                               value={user.password}
                               onChange={this.handleChange}/>

                        {this.state.error &&
                        <ValidationError error={"Неверный логин или пароль"}/>
                        }

                        <input className="event-btn btn-msu btn mt-2"
                               type="submit"
                               value="Войти"
                               onClick={this.handleSubmit}/>
                    </form>
                </fieldset>
            </div>
        );
    }
}

export default withRouter(Login);