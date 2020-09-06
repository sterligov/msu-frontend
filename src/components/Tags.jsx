import React from 'react';
import {get} from "axios";

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        let selected = {};
        if (this.props.selected) {
            this.props.selected.forEach(s => selected[s.name] = true);
        }
        this.state = {
            tags: [],
            selected: selected
        };
    }

    componentDidMount() {
        get('tags')
            .then(res => this.setState({tags: res.data["hydra:member"]}));
    }

    render() {
        const {selected} = this.state;
        return (
            <>
                {this.state.tags.map(tag => {
                    const checked = selected[tag.name] === undefined ? '' : 'checked';
                    return (
                        <div className="align-items-center" key={tag.name}>
                            <input className="tags-checkbox mr-2" type="checkbox" name={tag.name}
                                   defaultChecked={checked}/>
                            <label htmlFor="title">{tag.name}</label>
                        </div>
                    );
                })}
            </>
        );
    }
}