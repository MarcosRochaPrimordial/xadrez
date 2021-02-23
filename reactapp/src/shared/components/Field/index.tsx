import { Component } from "react";
import './field.css';

interface OwnProps {
    color: string;
}

export default class Field extends Component<OwnProps> {
    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const { color } = this.props;
        return (
            <div className="field-board" style={{backgroundColor: color}}></div>
        );
    }
}