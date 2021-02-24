import { Component } from "react";
import { Col } from "../../../core/models/FieldModel";
import Field from './Field';

interface OwnProps {
    fields: Col[];
}

export default class FieldList extends Component<OwnProps> {
    render() {
        const { fields } = this.props
        return (
            <div>
                {fields.map(i => (
                    <Field key={i.colLocation} color={i.field.color} />
                ))}
            </div>
        );
    }
}