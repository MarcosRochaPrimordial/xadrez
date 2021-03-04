import { Col } from "../../../core/models/FieldModel";
import Field from './Field';
import './fieldlist.css';

interface OwnProps {
    fields: Col[];
}

const FieldList = (props: OwnProps) => {
    const { fields } = props;
    return (
        <div className="line-row">
            {fields.map(i => (
                <Field key={i.colLocation} field={i.field} />
            ))}
        </div>
    );
};

export default FieldList;