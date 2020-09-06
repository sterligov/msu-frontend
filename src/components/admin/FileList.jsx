import React from 'react';
import FileItem from "./FileItem";

export default class FileList extends React.Component {
    getUploadedFiles() {
        const {files, previewImage} = this.props;
        const uploadedFiles = [];

        for (let key in files) {
            let boldFontClass = "";

            if (previewImage && files[key]) {
                boldFontClass = previewImage === files[key]["@id"] ? "font-weight-bold" : "";
            }

            uploadedFiles.push(
                <FileItem
                    key={key}
                    filename={key}
                    file={files[key]}
                    boldFontClass={boldFontClass}
                    handlePreviewImage={this.props.handlePreviewImage}
                    handleDeleteFile={this.props.handleDeleteFile}
                />
            );
        }

        return uploadedFiles;
    }

    render() {
        const uploadedFiles = this.getUploadedFiles();

        return (
            <>
                {uploadedFiles.length > 0 &&
                <h3 className="mt-3">
                    <div className="alert alert-danger">
                        <p>После выбора превью изображения обязательно нажмите на кнопку "Сохранить"</p>
                        <p>Если вы хотите, чтобы превью изображение идеально ложилось на блок со слайдами, нужно использовать изображения размером 500x400px для превью</p>
                    </div>
                    <p>Список прикрепленных файлов</p>
                    {uploadedFiles}
                </h3>
                }
            </>
        );
    }
}