import React from "react";
import ValidationError from "./ValidationError";
import {post} from "axios";
import {Link} from "react-router-dom";
import Spinner from "./Spinner";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaRef = React.createRef();

export default class AppealForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccessfullySend: false,
            isFormDisabled: false,
            validationErrors: {},
            appeal: {
                fullName: '',
                phone: '',
                address: '',
                birthYear: '',
                email: '',
                personType: 'Физическое лицо',
                message: '',
                organization: ''
            },
            file: {
                name: '',
                type: '',
                size: 0,
                id: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentDidMount() {
        document.title = 'Электронная приемная';
    }

    captchaChange() {
        let error = {...this.state.validationErrors};
        if (error["gRecaptchaResponse"] !== undefined) {
            delete error["gRecaptchaResponse"];
            this.setState({error: error});
        }
    }

    handleChange(e) {
        e.preventDefault();

        const inputName = e.target.getAttribute('name');
        let appeal = {...this.state.appeal};
        appeal[inputName] = e.target.value;

        if (this.state.validationErrors[inputName] !== undefined) {
            let errors = {...this.state.validationErrors};
            delete errors[inputName];
            this.setState({
                validationErrors: errors,
                appeal: appeal
            });
        } else {
            this.setState({appeal: appeal});
        }
    }

    uploadFormData() {
        let appeal = {...this.state.appeal};
        appeal.birthYear = +appeal.birthYear;

        if (isNaN(appeal.birthYear)) {
            appeal.birthYear = 0;
        }

        if (this.state.file && this.state.file.id) {
            appeal.mediaObject = this.state.file.id;
        }

        appeal.gRecaptchaResponse = recaptchaRef.current.getValue();
        appeal.department = `/api/departments/${this.props.department}`;

        post("/appeals", appeal)
            .then(
                () => {
                    this.setState({
                        isSuccessfullySend: true,
                        isFormDisabled: false
                    });
                },
                err => {
                    let errors = {};

                    if (err.response && err.response.data.violations) {
                        err.response.data.violations.map(v => errors[v.propertyPath] = v.message);
                    }
                    errors["unknown"] = "Во время обращения к серверу произошла ошибка! Проверьте корректность введенных данных.";

                    this.setState({
                        isFormDisabled: false,
                        validationErrors: errors
                    });
                }
            );
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({isFormDisabled: true, validationErrors: {}});

        const files = document.querySelector('input[name="appealFile"]').files;
        const lastFile = {...this.state.file};

        if (
            files.length > 0
            && (files[0].size !== lastFile.size
            || files[0].name !== lastFile.name
            || files[0].type !== lastFile.type)
        ) {
            const formData = new FormData();
            formData.append("file", files[0]);
            post("/media_objects", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(
                    res => {
                        let file = files[0];
                        file.id = res.data["@id"];
                        this.setState({file: files[0]});
                        this.uploadFormData();
                    },
                    () => {
                        this.setState({
                            isFormDisabled: false,
                            validationErrors: {
                                "appealFile": "Не удалось загрузить файл"
                            }
                        })
                    }
                );
        } else {
            this.uploadFormData();
        }
    }

    render() {
        if (!this.state.isSuccessfullySend) {
            return (
                <div className="section-main">
                    <h1>Электронная приемная</h1>
                    <div className="alert alert-info">
                        <p>
                            Пожалуйста, перед тем, как задать вопрос, ознакомьтесь со списком <Link to="/faq">часто задаваемых вопросов</Link>
                        </p>
                    </div>
                    <fieldset disabled={this.state.isFormDisabled}>
                        <form name="appeal" className="form-group w-75"
                              onSubmit={this.handleSubmit}>

                            <label className="font-weight-bold" htmlFor="fullName">ФИО*</label>
                            <input className="form-control" type="text" name="fullName"
                                   value={this.state.appeal.fullName}
                                   onChange={this.handleChange}/>
                            <ValidationError error={this.state.validationErrors.fullName}/>

                            <label className="font-weight-bold" htmlFor="birthYear">Год рождения*</label>
                            <input className="form-control" type="text" name="birthYear"
                                   value={this.state.appeal.birthYear}
                                   onChange={this.handleChange}/>
                            <ValidationError error={this.state.validationErrors.birthYear}/>

                            <label className="font-weight-bold" htmlFor="email">Email*</label>
                            <input className="form-control" type="text" name="email"
                                   value={this.state.appeal.email}
                                   onChange={this.handleChange}/>
                            <ValidationError error={this.state.validationErrors.email}/>

                            <label className="font-weight-bold" htmlFor="address">Адрес*</label>
                            <input className="form-control" type="text" name="address"
                                   value={this.state.appeal.address}
                                   onChange={this.handleChange}/>
                            <ValidationError error={this.state.validationErrors.address}/>

                            <label className="font-weight-bold" htmlFor="phone">Номер телефона*</label>
                            <input className="form-control" type="text" name="phone"
                                   value={this.state.appeal.phone}
                                   onChange={this.handleChange}/>
                            <ValidationError error={this.state.validationErrors.phone}/>

                            <label className="font-weight-bold" htmlFor="personType">Укажите кто вы*</label>
                            <select className="form-control mb-3" name="personType" onChange={this.handleChange}>
                                <option value="Физическое лицо">Физическое лицо</option>
                                <option value="Юридическое лицо">Юридическое лицо</option>
                                <option value="Абитуриент">Абитуриент</option>
                                <option value="Студент">Студент</option>
                                <option value="Выпускник">Выпускник</option>
                                <option value="Преподаватель">Преподаватель</option>
                                <option value="Сотрудник">Сотрудник</option>
                            </select>

                            <label className="font-weight-bold" htmlFor="phone">Название организации</label>
                            <input className="form-control" type="text" name="organization"
                                   value={this.state.appeal.organization}
                                   onChange={this.handleChange}/>
                            <ValidationError error={this.state.validationErrors.organization}/>

                            <label className="font-weight-bold" htmlFor="message">Сообщение*</label>
                            <textarea className="form-control"

                                      name="message"
                                      onChange={this.handleChange}/>
                            <ValidationError error={this.state.validationErrors.message}/>

                            <label className="font-weight-bold" htmlFor="appealFile">Прикрепить файл</label>
                            <input className="form-control-file mb-5"
                                   type="file"
                                   name="appealFile"/>
                            <ValidationError error={this.state.validationErrors.appealFile}/>

                            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                                       ref={recaptchaRef}
                                       hl="ru"
                                       onChange={this.captchaChange}/>
                            <ValidationError error={this.state.validationErrors.gRecaptchaResponse}/>

                            <input className="event-btn btn btn-msu mt-4"
                                   type="submit"
                                   value="Отправить"
                                   onClick={this.handleSubmit}/>
                        </form>
                    </fieldset>

                    <strong>Поля отмеченные * обязательны для заполнения</strong>

                    <ValidationError error={this.state.validationErrors.unknown}/>

                    {this.state.isFormDisabled && <Spinner/>}
                </div>
            );
        } else {
            return (
                <div className="section-main">
                    <div className="alert alert-success">
                        <h1>
                            <p>Ваше сообщение успешно отправлено. Спасибо за обращение!</p>
                            <p>Ответ придет Вам на почту в ближайшее время.</p>
                        </h1>
                    </div>
                </div>
            );
        }
    }
}