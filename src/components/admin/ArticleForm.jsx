import React from "react";
import axios, {post} from "axios";
import Error from "../Error";
import LinkButtons from "./LinkButtons";
import Tags from "../Tags";
import ValidationError from "../ValidationError";
import format from "date-format";
import {Editor} from "@tinymce/tinymce-react";
import FileList from "./FileList";
import {Redirect} from "react-router-dom";
import {authService} from "../../authService";

export default class ArticleForm extends React.Component {
    constructor(props) {
        super(props);

        let article = {};
        let previewImage = '';

        if (this.props.article) {
            article = this.props.article;
            if (article.previewImage) {
                previewImage = article.previewImage.mediaObject["@id"];
            }
        }

        let files = {}

        if (this.props.article && Object.keys(this.props.article["mediaObjects"]).length > 0) {
            for (let key in this.props.article["mediaObjects"]) {
                const id = this.props.article["mediaObjects"][key]["@id"];
                files[id] = this.props.article["mediaObjects"][key];
            }
        }

        this.state = {
            article: article,
            previewImage: previewImage,
            validationErrors: {},
            error: this.props.error ? this.props.error : null,
            isFormDisabled: false,
            files: files
        };

        this.handlePreviewImage = this.handlePreviewImage.bind(this);
        this.handleDeleteFile = this.handleDeleteFile.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handlePreviewImage(e) {
        this.setState({previewImage: e.target.dataset.imageId});
    }

    handleDeleteFile(e) {
        const fileId = e.target.dataset.fileId;
        const id = fileId.split('/')[3];

        if (id !== undefined) {
            axios.delete(`/media_objects/${id}`)
                .then(
                    () => {
                        if (this.state.previewImage === fileId) {
                            this.setState({previewImage: ''});
                        }
                        let files = {...this.state.files};
                        delete files[fileId];
                        this.setState({files: files});
                    },
                    () => {
                        alert("Ошибка! Не удалось удалить файл.");
                    }
                )
        } else {
            alert("Ошибка! Не удалось удалить файл.");
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({validationErrors: {}});
        const article = this.collectFormData();

        this.props.fetchData(article, this.state.previewImage)
            .then(
                () => {
                    if (this._isMounted) {
                        this.setState({isFormDisabled: false});
                    }
                },
                err => {
                    if (this._isMounted) {
                        this.setState({
                            isFormDisabled: false,
                            validationErrors: this.getErrorList(err)
                        });
                    }
                }
            );
    }

    handleChangeFile(e) {
        const formFiles = document.querySelector("input[name='media']").files;

        for (let i = 0; i < formFiles.length; i++) {
            let r = Math.random().toString(36).substring(7);
            const filename = formFiles[i].name + '_' + r;
            const uploadFiles = {...this.state.files};

            uploadFiles[filename] = null;
            this.setState({files: uploadFiles});

            const formData = new FormData();
            formData.append("file", formFiles[i]);

            post("/media_objects", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(
                    res => {
                        const uploadFiles = {...this.state.files};
                        uploadFiles[filename] = res.data;
                        this.setState({files: uploadFiles});
                    },
                    err => {
                        uploadFiles[filename] = {error: {err}};
                    }
                );
        }

        e.target.value = "";
    }

    handleEditorChange(content) {
        let article = {...this.state.article};
        article.text = content;

        let errors = {...this.state.validationErrors};
        delete errors["text"];

        this.setState({
            article: article,
            errors: errors
        });
    }

    handleChange(e) {
        const inputName = e.target.getAttribute("name");
        let errors = {...this.state.validationErrors};
        delete errors[inputName];
        this.setState({validationErrors: errors});
    }

    getErrorList(err) {
        let errors = {};

        if (err.response && err.response.data.violations) {
            err.response.data.violations.map(v => errors[v.propertyPath] = v.message);
        }
        errors["unknown"] = "Во время обращения к серверу произошла ошибка! Проверьте корректность введенных данных.";

        return errors;
    }

    collectFormData() {
        this.setState({isFormDisabled: true, errors: {}});

        let article = new FormData(document.forms.article);

        article = Object.fromEntries(article);
        article.text = this.state.article.text;
        article.tags = [];

        let tags = document.getElementsByClassName("tags-checkbox");
        for (let i = 0; i < tags.length; i++) {
            const curTag = tags.item(i);
            if (curTag.checked) {
                article.tags.push("api/tags/" + curTag.getAttribute("name"))
            }
        }

        article.mediaObjects = [];

        for (let key in this.state.files) {
            if (this.state.files[key]) {
                article.mediaObjects.push(this.state.files[key]["@id"]);
            }
        }

        delete article.previewImage;

        return article;
    }

    render() {
        if (!authService.isAdmin()) {
            return <Redirect to="/"/>
        }

        if (this.state.error) {
            return <Error error={this.state.error}/>;
        }

        const {article, files} = this.state;
        const publishedAt = article.publishedAt ? new Date(article.publishedAt) : new Date();

        return (
            <div className="section-main">
                <LinkButtons article={article}/>

                <fieldset disabled={this.state.isFormDisabled}>
                    <form name="article" className="form-group w-75"
                          onSubmit={this.handleSubmit}>

                        <h3 className="mt-2 font-weight-bold">Тэги</h3>
                        <Tags selected={article.tags}/>

                        <label htmlFor="title" className="mt-2 font-weight-bold">
                            URL
                            <p className="mb-0">
                                Данное поле должно быть уникальным! Использовать только при
                                необходимости задания читабельного URL
                                вручную. Иначе не изменять и не заполнять!!!
                                Например если вбить education, то данная страница будет доступна по адресу
                                msu.uz/education или msu.uz/articles/education.
                            </p>
                        </label>
                        <input className="form-control"
                               type="text"
                               name="slug"
                               defaultValue={article.slug}
                               onChange={this.handleChange}/>
                        <ValidationError error={this.state.validationErrors.slug}/>

                        <label htmlFor="title" className="font-weight-bold">Заголовок*</label>
                        <input className="form-control"
                               type="text"
                               name="title"
                               defaultValue={article.title}
                               onChange={this.handleChange}/>
                        <ValidationError error={this.state.validationErrors.title}/>

                        <label htmlFor="previewText" className="font-weight-bold">Превью текст</label>
                        <textarea className="form-control"
                                  name="previewText"
                                  defaultValue={article.previewText}
                                  onChange={this.handleChange}/>
                        <ValidationError error={this.state.validationErrors.previewText}/>

                        <label htmlFor="publishedAt" className="font-weight-bold">Дата</label>
                        <input className="form-control"
                               type="date"
                               name="publishedAt"
                               defaultValue={format('yyyy-MM-dd', publishedAt)}
                               onChange={this.handleChange}/>
                        <ValidationError error={this.state.validationErrors.publishedAt}/>

                        <label className="font-weight-bold">
                            Текст*
                            <p className="mb-0">
                                (Пожалуйста, удаляйте стиль шрифта текста скопированного из ворда,
                                чтобы он не отличался от основного шрифта на сайте)
                            </p>
                        </label>
                        <Editor
                            id="tiny-redactor"
                            initialValue={article.text}
                            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                            init={{
                                height: 500,
                                width: 900,
                                menubar: true,
                                plugin: "a_tinymce_plugin",
                                a_plugin_option: true,
                                force_br_newlines : true,
                                force_p_newlines : false,
                                forced_root_block : "",
                                a_configuration_option: 400,
                                plugins: "advlist autolink link image lists charmap print preview hr anchor fullscreen insertdatetime media save table directionality",
                                toolbar: "undo redo styleselect forecolor fontsizeselect bold italic removeformat alignleft aligncenter alignright alignjustify bullist numlist outdent indent code link image",
                                fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt"
                            }}
                            onEditorChange={this.handleEditorChange}
                        />

                        <label htmlFor="media" className="mt-4 font-weight-bold">Прикрепить файлы</label>
                        <input className="form-control-file mb-2"
                               type="file"
                               name="media"
                               onChange={this.handleChangeFile}
                               multiple
                        />

                        <input className="btn-msu event-btn mt-2"
                               type="submit"
                               value="Сохранить"
                               onClick={this.handleSubmit}
                        />
                    </form>
                </fieldset>

                <strong>Поля отмеченные * обязательны для заполнения</strong>

                <ValidationError error={this.state.validationErrors.unknown}/>

                <FileList files={files}
                          previewImage={this.state.previewImage}
                          handlePreviewImage={this.handlePreviewImage}
                          handleDeleteFile={this.handleDeleteFile}
                />
            </div>
        );
    }
}