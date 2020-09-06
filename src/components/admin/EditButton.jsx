import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class EditButton extends React.Component {
    render() {
        return (
            <Link to={`/admin/articles/${this.props.article.id}`}>
                <button className="btn btn-info btn-sm">Редактировать страницу</button>
            </Link>
        );
    }
}

export default withRouter(EditButton);