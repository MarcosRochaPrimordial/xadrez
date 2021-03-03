import { Col } from "../../../core/models/FieldModel";
import Field from './Field';

interface OwnProps {
    fields: Col[];
}

const FieldList = (props: OwnProps) => {
    const { fields } = props;
    return (
        <div>
            {fields.map(i => (
                <Field key={i.colLocation} color={i.field.color} />
            ))}
        </div>
    );
};

export default FieldList;