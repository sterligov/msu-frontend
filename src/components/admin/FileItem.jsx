import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class FileItem extends React.Component {
    render() {
        const {file, filename} = this.props;

        if (file === null) {
            return (
                <div className="d-flex mt-2">
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Загрузка...</span>
                    </div>
                    <p>{filename}</p>
                </div>
            );
        } else if (file.error) {
            return <div className="mt-3 mark_red">Не удалось загрузить файл</div>
        } else {
            return (
                <>
                    <div className="mt-3 file-item">
                        <a href={file.contentUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`mr-3 ${this.props.boldFontClass}`}>
                            {file.contentUrl}
                        </a>
                    </div>
                    <CopyToClipboard text={file.contentUrl}>
                        <button className="btn btn-info btn-sm mt-1">
                            Скопировать ссылку
                        </button>
                    </CopyToClipboard>
                    {file.contentUrl.toLowerCase().match("\\.(jpg|jpeg|png)$") &&
                    <button className="btn btn-info btn-sm mt-1 ml-2"
                            data-image-id={file["@id"]}
                            onClick={this.props.handlePreviewImage}>
                        Сделать превью изображением
                    </button>
                    }
                    <button className="btn btn-danger btn-sm mt-1 ml-2"
                            data-file-id={file["@id"]}
                            onClick={this.props.handleDeleteFile}>
                        Удалить файл
                    </button>
                </>
            );
        }
    }
}